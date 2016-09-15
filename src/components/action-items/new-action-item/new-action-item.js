import template from './new-action-item.html';
import styles from './new-action-item.scss';

export default {
  template,
  bindings: {
    position: '<',
    company: '<'
  },
  controller
};

controller.$inject = ['$mdDialog', '$window', '$scope', 'actionItemService'];
function controller ($mdDialog, $window, $scope, actionItemService) {
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  
    


  const resetItem = () => {
    if(this.position) this.actionItem = {company: this.position.company._id};
    else this.actionItem = {};
  };

  resetItem();

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.addCompanyItem = (actionItem, companyId, userId) => {
    actionItemService.addCompanyItem(actionItem, companyId, userId)
    .then(addedService => {
      console.log(addedService);
    })
    .catch(err => console.log(err));
  };

  this.addPositionItem = (actionItem, posId, userId) => {
    actionItemService.addPositionItem(actionItem, posId, userId)
    .then(addedService => {
      console.log(addedService);
    })
    .catch(err => console.log(err));
  };

  this.submit = () => {
    $mdDialog.hide();
    if(this.position) {
      this.addPositionItem(this.actionItem, this.position._id, this.userId);
    } else {
      this.addCompanyItem(this.actionItem, this.company._id, this.userId);
    }
    resetItem();
    $scope.addActionItem.$setPristine();
    $scope.addActionItem.$setUntouched();
  };
}
