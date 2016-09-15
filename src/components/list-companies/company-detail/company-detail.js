//component for detailed position view
import template from './company-detail.html';
import styles from './company-detail.scss';

export default {
  template,
  bindings: {
    companies: '=',
  },
  controller
};



controller.$inject = ['$mdDialog', 'companyService', '$window', '$state', 'contactService'];
function controller($mdDialog, companyService, $window, $state, contactService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  //gets the detailed info of selected company
  companyService.get($state.params.companyId)
    .then(company => {
      this.company = company;
      contactService.getByCompany(this.userId, company._id)
        .then(contacts => {
          this.companyContacts = contacts;
        });
    })
    .catch(err => console.log(err));

  this.edit = ()=>{
    const parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<edit-company company="$ctrl.company"></edit-company>',
      controller(){},
      locals: {
        company: this.company
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(updatedCompany => {
      if (!updatedCompany) return;
      //pass copied and updated version to original
      angular.copy(updatedCompany, this.company);
    });
  };

}
