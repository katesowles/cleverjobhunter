import template from './visualizations.html';
import styles from './visualizations.html';

export default {
  template,
  controller
};

controller.$inject = ['$state'];

function controller($state) {
  this.styles = styles;
  // TODO : controller to render each chart in respective canvas, chart.js npm installed already
};
