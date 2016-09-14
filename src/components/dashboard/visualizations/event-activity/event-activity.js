import template from './event-activity.html';
// import styles from './event-activity.html';

export default {
  template,
  bindings: {
    renderViz: '='
  },
  controller() {
    // this.styles = styles;

    this.completedTaskCount = 3;
    this.totalTaskCount = 5;

    // this.renderViz('brand', 'Events', 'Attended');
  },
};
