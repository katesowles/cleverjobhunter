import template from './brand-activity.html';
// import styles from './brand-activity.html';

export default {
  template,
  bindings: {
    renderViz: '='
  },
  controller() {
    // this.styles = styles;

    this.completedTaskCount = 3;
    this.totalTaskCount = 5;

    // this.renderViz('brand', 'Online Interactions', 'Complete');
  },
};
