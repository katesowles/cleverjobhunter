import template from './action-items.html';
import styles from './action-items.scss';

export default {
  template,
  bindings: {
    action: '<',
    position: '<',
    actionItems: '<'
  },
  controller
};

function controller () {
  this.styles = styles;
  console.log(this.actionItems);
}
