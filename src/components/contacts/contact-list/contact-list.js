import template from './contact-list.html';

export default {
  template,
  bindings: {
    contact: '<',
  },
  controller
};


controller.$inject = ['$mdDialog'];
function controller ($mdDialog) {

  this.edit = $event => {
    const parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<edit-contact contact="$ctrl.contact"></edit-contact>',
      controller(){},
      locals: {
        contact: this.contact
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then( updatedContact => {
      if (!updatedContact) return;
      //pass copied and updated version to original
      angular.copy(updatedContact, this.contact);
    });
  };
};
