import template from './landing.html';
import styles from './landing.html';

export default {
  template,
  controller
};

controller.$inject = ['$state'];

function controller($state) {
  this.styles = styles;

  // something to do with $state potentially
};
