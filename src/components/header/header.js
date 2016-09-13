import template from './header.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.username = 'Name-Goes-Here';
  this.logout = ()=>{
    userService.logout();
    $state.go('home');
  };
  this.isAuthenticated = userService.isAuthenticated;
};
