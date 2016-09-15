import template from './new-action-item.html';
import styles from './new-action-item.scss';

export default {
  template,
  bindings: {
    position: '<',
    company: '<',
    which: '<'
  },
  controller
};

controller.$inject = ['$mdDialog', '$window', '$scope', 'actionItemService'];
function controller ($mdDialog, $window, $scope, actionItemService) {
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  console.log(this.userId);
  console.log(this.which);
  console.log(this.position);
  console.log(this.company);


  const resetItem = () => {
    if (this.which === 'position') {
      this.actionItem = {
        position: this.position._id,
        company: this.position.company._id || ''
      };
    } else if (this.which === 'company') {
      this.actionItem = {
        company: this.company._id
      };
    } else {
      this.actionItem = {};
    }

  };

  resetItem();

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.add = (actionItem, userId) => {
    actionItemService.addForPosOrComp(actionItem, userId)
    .then(addedService => {
      console.log(addedService);
    })
    .catch(err => console.log(err));
  };

  this.submit = () => {
    $mdDialog.hide();
    this.add(this.actionItem, this.userId);
    resetItem();
    $scope.addActionItem.$setPristine();
    $scope.addActionItem.$setUntouched();
  };
}
