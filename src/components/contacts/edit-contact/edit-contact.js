import template from './edit-contact.html';

export default {
  template,
  transclude: true,
  bindings: {
    contactToEdit: '<contact',
  },
  controller
};

controller.$inject = ['$mdDialog', 'contactService'];
function controller($mdDialog, contactService) {
  this.contact = angular.copy(this.contactToEdit);

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.save = () => {
    contactService.update(this.contact)
      .then(updatedContact => {
        $mdDialog.hide(updatedContact);
      });
  };

}
