import template from './application-activity.html';
// import styles from './application-activity.html';

export default {
  template,
  bindings: {
    renderViz: '&'
  },
  controller() {
    // this.styles = styles;

    this.completedTaskCount = 3;
    this.totalTaskCount = 5;

    alert('hello');
    this.renderViz('application', 'Applications', 'Sent');
  },
};
