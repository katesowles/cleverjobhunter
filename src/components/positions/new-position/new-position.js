//component for handling submit/cancel of new position
import template from './new-position.html';

export default {
  template,
  bindings: {
    add: '<',
    addButton: '=',
    companies: '<'
  },
  controller
};

controller.$inject = ['$scope', '$window', '$mdDialog'];
function controller ($scope, $window, $mdDialog) {
  this.currentDate = new Date();

  this.userId = $window.localStorage['id'];

  const resetPosition = () => {
    this.position = {
      questions: []
    };
  };

  resetPosition();

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.addQuestionsInput = () => {
    this.position.questions.unshift({});
  };

  //saves and adds information to user's positions
  this.submit = () => {
    $mdDialog.hide(this.position);
    console.log(this.position);
    this.add(this.position, this.userId);
    resetPosition();
    $scope.newPosition.$setPristine();
    $scope.newPosition.$setUntouched();
  };
};
