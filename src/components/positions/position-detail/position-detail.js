//component for detailed position view
import template from './position-detail.html';
import styles from './position-detail.scss';

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

  //gets the detailed info of selected position
  positionService.get($state.params.positionId)
    .then(position => {
      this.position = position;
    })
    .catch(err => console.log(err));

  this.newActionItem = ($event) => {
    const parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-action-item company="$ctrl.company" which="$ctrl.which" position="$ctrl.position"></new-action-item>',
      controller(){},
      locals: {
        company: this.company,
        position: this.position,
        which: this.which
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then( newActionItem => {
      if (!newActionItem) return;
      this.actionItems.unshift(newActionItem);
    });
  };

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

  actionItemService.getByPosOrComp(this.which,$state.params.positionId)
  .then(items => {
    this.actionItems = items;
  })
  .catch(err => {
    console.log(err);
  });

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
