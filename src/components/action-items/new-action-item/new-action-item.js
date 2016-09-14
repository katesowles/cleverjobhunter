import template from './new-action-item.html';
import styles from './new-action-item.scss';

export default {
  template,
  bindings: {
    position: '<'
  },
  controller
};

controller.$inject = ['$mdDialog', '$window', '$scope', 'companyService'];
function controller ($mdDialog, $window, $scope, companyService) {
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  companyService.getByUser

  const resetItem = () => {
    this.actionItem = {};
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
    $scope.addContact.$setPristine();
    $scope.addContact.$setUntouched();
  };
}
