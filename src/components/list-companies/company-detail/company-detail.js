//component for detailed position view
import template from './company-detail.html';
import styles from './company-detail.scss';

export default {
  template,
  bindings: {
    companies: '=',
    position: '<',
    which: '<'
  },
  controller
};

controller.$inject = ['$mdDialog', 'companyService', '$window', '$state', 'contactService', 'actionItemService'];
function controller($mdDialog, companyService, $window, $state, contactService, actionItemService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  this.which = 'company';

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
      template: '<new-action-item which="$ctrl.which" position="$ctrl.position" company="$ctrl.company"></new-action-item>',
      controller(){},
      locals: {
        company: this.company,
        position: this.position,
        which: this.which
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then( newActionItem => {
      if (!newActionItem) return;
      this.actionItems.unshift(newActionItem);
    });
  };

  actionItemService.getByPosOrComp(this.which,$state.params.companyId)
  .then(items => {
    this.actionItems = items;
  })
  .catch(err => {
    console.log(err);
  });

  this.complete = (id) => {
    actionItemService.remove(id)
    .then(removed => {
      this.actionItems.forEach((e,i) => {
        if (id === e._id) {
          this.actionItems.splice(i, 1);
        }
      });
      console.log(removed);
    });
  };
}
