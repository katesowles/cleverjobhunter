import template from './header.html';

export default {
  template,
  controller
};

controller.$inject = ['$state'];
function controller($state) {
  this.username = 'Name-Goes-Here';
};