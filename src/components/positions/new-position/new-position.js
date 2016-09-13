import template from './new-position.html';

export default {
  template,
  bindings: {
    add: '<',
    addButton: '='
  },
  controller
};

controller.$inject = ['$scope', '$window', '$mdDialog'];
function controller ($scope, $window, $mdDialog) {

  this.userId = $window.localStorage['id'];

  const resetPosition = () => {
    this.position = {};
  };

  resetPosition();

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.submit = () => {
    $mdDialog.hide();
    this.add(this.position, this.userId);
    resetPosition();
    $scope.newPosition.$setPristine();
    $scope.newPosition.$setUntouched();
  };
};
