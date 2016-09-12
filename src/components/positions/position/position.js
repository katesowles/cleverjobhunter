import template from './position.html';
import styles from './position.scss';

export default {
  template,
  controller
};

function controller(){
  this.styles = styles;
  //dummy data for now, but will eventually be a company id in the bindings
  this.position = {
    title: 'abcs',
    postingInfo: 'Take this Job!',
    dateAdvertised: new Date(),
    actionItems: [{
      date: new Date(),
      plan: 'Get money, yo'
    }]
  };
}
