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

  const resetCompany = () => {
    this.company = {
      pros: [],
      cons: [],
      questions: []
    };
  };

  resetCompany();

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.addProsInput = () => {
    this.company.pros.unshift({});
  };

  this.addConsInput = () => {
    this.company.cons.unshift({});
  };

  this.addQuestionsInput = () => {
    this.company.questions.unshift({});
  };

  //gives the form info to add a new company
  this.submit = () => {
    $mdDialog.hide(this.company);
    this.add(this.company, this.userId);
    resetCompany();
    $scope.newCompany.$setPristine();
    $scope.newCompany.$setUntouched();
  };
};
