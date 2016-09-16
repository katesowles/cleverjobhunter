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
  this.pros = [];
  this.cons = [];
  this.questions = [];

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
    this.pros.push({});
  };

  this.addConsInput = () => {
    this.cons.push({});
  };

  this.addQuestionsInput = () => {
    this.questions.push({});
  };

  //gives the form info to add a new company
  this.submit = () => {
    for (let i = 0; i < this.pros.length; i++) {
      for (let each in this.pros[i]) {
        if( each !== '$$hashKey') {
          this.company.pros.push(this.pros[i][each]);
        }
      }
    }
    for (let i = 0; i < this.cons.length; i++) {
      for (let each in this.cons[i]) {
        if( each !== '$$hashKey') {
          this.company.cons.push(this.cons[i][each]);
        }
      }
    }
    for (let i = 0; i < this.questions.length; i++) {
      for (let each in this.questions[i]) {
        if( each !== '$$hashKey') {
          this.company.questions.push(this.questions[i][each]);
        }
      }
    }

    $mdDialog.hide(this.company);
    this.add(this.company, this.userId);
    resetCompany();
    $scope.newCompany.$setPristine();
    $scope.newCompany.$setUntouched();
  };
};
