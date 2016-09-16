import template from './user-edit.html';

export default {
  template,
  bindings: {
    userToEdit: '<user'
  },
  controller
};

controller.$inject = ['$mdDialog', 'userService', '$state', '$window'];

function controller($mdDialog, userService, $state, $window){
  this.user = angular.copy(this.userToEdit);
  this.userId = $window.localStorage['id'];

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.save = () => {
    userService.update(this.user,this.user)
    .then(updateduser => {
      $mdDialog.hide(updateduser);
    });
  };
}
