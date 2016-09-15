//component for the new-contact dialog
import template from './new-contact.html';

export default {
  template,
  transclude: true,
  bindings: {
    add: '<',
    addButton: '=',
    companies: '<'
  },
  controller
};

controller.$inject = ['$scope', '$window', '$mdDialog'];
function controller ($scope, $window, $mdDialog) {

  this.userId = $window.localStorage['id'];

  const resetContact = () => {
    this.contact = {};
  };

  resetContact();
  this.cancel = () => {
    $mdDialog.hide();
  };

  //saves and adds information to user's contacts
  this.submit = () => {
    $mdDialog.hide(this.contact);
    this.add(this.contact, this.userId);
    resetContact();
    $scope.addContact.$setPristine();
    $scope.addContact.$setUntouched();
  };

};
