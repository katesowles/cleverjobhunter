import template from './new-company.html';

export default {
  template,
  bindings: {
    add: '<',
    addButton: '='
  },
  controller
};

controller.$inject = ['$scope', '$window'];
function controller ($scope, $window) {

  this.userId = $window.localStorage['id'];
  console.log(this.userId);

  const resetCompany = () => {
    console.log('new-company reset');
    this.company = {};
  };

  resetCompany();

  this.submit = () => {
    console.log('got here to new-company form submit');
    this.add(this.company, this.userId);
    resetCompany();
    $scope.addCompany.$setPristine();
    $scope.addCompany.$setUntouched();
  };
};
