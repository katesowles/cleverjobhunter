import template from './new-contact.html';

export default {
  template,
  bindings: {
    add: '<',
    addButton: '=',
    companies: '<'
  },
  controller
};

controller.$inject = ['$scope', '$window'];
function controller ($scope, $window) {
  console.log(this.companies);

  this.userId = $window.localStorage['id'];

  const resetContact = () => {
    this.contact = {};
  };

  resetContact();

  this.submit = () => {
    this.add(this.contact, this.userId);
    resetContact();
    $scope.addContact.$setPristine();
    $scope.addContact.$setUntouched();
  };
};
