import template from './contact-activity.html';
// import styles from './contact-activity.html';

export default {
  template,
  bindings: {
    renderViz: '='
  },
  controller() {
    // this.styles = styles;

    this.completedTaskCount = 3;
    this.totalTaskCount = 5;

    // this.renderViz('brand', 'New Contacts', 'Made');
  },
};
