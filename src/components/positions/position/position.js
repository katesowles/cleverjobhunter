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


controller.$inject = ['$mdDialog', 'positionService', '$window', '$state', 'actionItemService'];

function controller($mdDialog, positionService, $window, $state, actionItemService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  this.action = 'hide';
  this.which = 'position';

  actionItemService.getByPosOrComp(this.which, $state.params.positionId)
    .then(actionItems => {
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

  this.edit = ()=>{
    const parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<edit-position position="$ctrl.position"></edit-position>',
      controller(){},
      locals: {
        position: this.position
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then( updatedPosition => {
      if (!updatedPosition) return;
      //pass copied and updated version to original
      angular.copy(updatedPosition, this.position);
    });
  };

}
