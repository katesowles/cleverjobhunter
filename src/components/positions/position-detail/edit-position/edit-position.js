import template from './edit-position.html';

export default {
  template,
  bindings: {
    positionToEdit: '<position'
  },
  controller
};

controller.$inject = ['$mdDialog', 'positionService', '$state', '$window', 'companyService'];

function controller($mdDialog, positionService, $state, $window, companyService){

  this.userId = $window.localStorage['id'];

  //get users companies to populate the drop down
  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.save = () => {
    this.position._id = $state.params.positionId;

    positionService.update(this.position)
      .then(updatedPosition => {
        $mdDialog.hide(updatedPosition);
      });
  };
}
