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



controller.$inject = ['$mdDialog', 'companyService', '$window', '$state'];
function controller($mdDialog, companyService, $window, $state){
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  this.which = 'company';

  //gets the detailed info of selected company
  companyService.get($state.params.companyId)
    .then(company => {
      this.company = company;
    })
    .catch(err => console.log(err));

  //edits the company info
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

  //opens dialog to enter a new action item
  this.newActionItem = ($event) => {
    const parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-action-item company="$ctrl.company"></new-action-item>',
      controller(){},
      locals: {
        company: this.company
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then( updatedCompany => {
      if (!updatedCompany) return;
      //pass copied and updated version to original
      angular.copy(updatedCompany, this.company);
    });
  };

}


