// component for handling form submit info of a new company
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
    this.company = {
      pros: [],
      cons: []
    };
  };

  resetCompany();

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.addInput = (type) => {
    this.company[type].push({});
  };

  //gives the form info to add a new company
  this.submit = () => {
    console.log('got here to new-company form submit');
    $mdDialog.hide();
    this.add(this.company, this.userId);
    resetCompany();
    $scope.newCompany.$setPristine();
    $scope.newCompany.$setUntouched();
  };
};
