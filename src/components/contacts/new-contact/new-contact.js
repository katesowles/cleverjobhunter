import template from './new-contact.html';

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

  const resetContact = () => {
    console.log('new-contact resetContact function');
    this.contact = {};
  };

  resetContact();

  this.submit = () => {
    console.log('got here to new-contact form submit');
    this.add(this.contact, this.userId);
    resetContact();
    $scope.addContact.$setPristine();
    $scope.addContact.$setUntouched();
  };
};
