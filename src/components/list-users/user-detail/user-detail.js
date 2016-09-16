import template from './user-detail.html';
import styles from './user-detail.scss';

export default {
  template,
  controller
};

controller.$inject = ['$mdDialog', 'userService', '$window', 'positionService', 'companyService', 'contactService'];
function controller($mdDialog, userService, $window, positionService, companyService, contactService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  userService.getMe(this.userId)
  .then( result => this.user = result )
  .catch( err => console.log(err) );

  positionService.getByUser(this.userId)
  .then( result => this.positions = result )
  .catch( err => console.log(err) );

  companyService.getByUser(this.userId)
  .then( result => this.companies = result )
  .catch( err => console.log(err) );

  contactService.getByUser(this.userId)
  .then( result => this.user.contacts = result )
  .catch( err => console.log(err) );

  //edits the company info
  this.edit = ()=>{
    const parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<user-edit user="$ctrl.user"></user-edit>',
      controller(){},
      locals: {
        user: this.user
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then( updateduser => {
      if (!updateduser) return;
      //pass copied and updated version to original
      angular.copy(updateduser, this.user);
    });
  };

}
