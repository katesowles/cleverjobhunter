import template from './edit-company.html';

export default {
  template,
  bindings: {
    companyToEdit: '<company'
  },
  controller
};

controller.$inject = ['$mdDialog', 'companyService', '$state', '$window'];

function controller($mdDialog, companyService, $state, $window){
  this.company = angular.copy(this.companyToEdit);
  this.userId = $window.localStorage['id'];

  //get users companies to populate the drop down
//   companyService.getByUser(this.userId)
//     .then(companies => {
//       this.companies = companies;
//     })
//     .catch(err => console.log(err));

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.save = () => {
    this.company._id = $state.params.companyId;

    companyService.update(this.company)
      .then(updatedCompany => {
        $mdDialog.hide(updatedCompany);
      });
  };
}
