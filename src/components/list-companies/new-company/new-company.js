import template from './new-company.html';

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
  console.log(this.userId);

  const resetCompany = () => {
    this.company = {};
  };

  resetCompany();

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.submit = () => {
    console.log('got here to new-company form submit');
    $mdDialog.hide();
    this.add(this.company, this.userId);
    resetCompany();
    $scope.newCompany.$setPristine();
    $scope.newCompany.$setUntouched();
  };
};
