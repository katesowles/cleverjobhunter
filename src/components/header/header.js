import template from './header.html';

export default {
  template,
  controller
};


controller.$inject = ['$state'];
function controller($state) {
  // TODO : logic to determine whether or not isAuthenticated is valid or not, determines which links show
  this.username = 'Name-Goes-Here';
};
