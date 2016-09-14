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

controller.$inject = ['$state', 'actionItemService', '$window'];

function controller ($state, actionItemService, $window) {
  this.styles = styles;
  console.log($state.params.which);
  console.log($state.params.parentId);
  this.parentName = $state.params.parentName;

  actionItemService.getByPosOrComp($state.params.which, $state.params.parentId)
  .then(actionItems => {
    actionItems.map(e => {
      e.dateDue = $window.moment(e.dateDue).format('MM-DD-YYYY');
    });
    this.actionItems = actionItems;
    console.log(this.actionItems);
  })
  .catch(err => console.log(err));

  this.complete = (id) => {
    actionItemService.remove(id)
    .then(removed => {
      this.actionItems.forEach((e,i) => {
        if (id === e._id) {
          this.actionItems.splice(i, 1);
        }
      });
      console.log(removed);
    });
  };
}
