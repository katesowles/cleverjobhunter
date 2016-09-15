import template from './action-item-list.html';
import styles from './action-item-list.scss';

export default {
  template,
  bindings: {
    action: '<',
    position: '<',
    item: '<'
  },
  controller
};

function controller () {
  this.styles = styles;

  console.log(this.position);
  console.log(this.item);
}
