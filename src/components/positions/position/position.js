//component for detailed position view
import template from './position.html';
import styles from './position.scss';

export default {
  template,
  bindings: {
    positions: '=',
  },
  controller
};

controller.$inject = ['positionService', '$window', '$state', 'actionItemService'];
function controller(positionService, $window, $state, actionItemService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  this.addButton = 'add';
  this.which = 'position';

  actionItemService.getByPosOrComp(this.which, $state.params.positionId)
    .then(actionItems => {
      console.log(actionItems);
      this.actionItems = actionItems;
    })
    .catch(err => console.log(err));


  //gets the detailed info of selected position
  positionService.get($state.params.positionId)
    .then(position => {
      position.dateApplied = $window.moment(position.dateApplied).format('MM-DD-YYYY');
      position.dateAdvertised = $window.moment(position.dateAdvertised).format('MM-DD-YYYY');
      this.position = position;
    })
    .catch(err => console.log(err));

}
