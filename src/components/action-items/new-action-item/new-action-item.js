import template from './new-action-item.html';
import styles from './new-action-item.scss';

export default {
  template,
  bindings: {
    position: '<'
  },
  controller
};

controller.$inject = ['$mdDialog', '$window', '$scope', 'actionItemService'];
function controller ($mdDialog, $window, $scope, actionItemService) {
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  console.log(this.position.company._id);

  // companyService.getByUser

  const resetItem = () => {
    this.actionItem = {
      company: this.position.company._id
    };
  };

  resetItem();

  this.cancel = () => {
    $mdDialog.hide();
  };


  this.add = (actionItem, posId, userId) => {
    actionItemService.add(actionItem, posId, userId)
    .then(addedService => {
      console.log(addedService);
    })
    .catch(err => console.log(err));
  };

  this.submit = () => {
    $mdDialog.hide();
    this.add(this.actionItem, this.position._id, this.userId);
    resetItem();
    $scope.addActionItem.$setPristine();
    $scope.addActionItem.$setUntouched();
  };
}
