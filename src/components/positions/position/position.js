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


controller.$inject = ['$mdDialog', 'positionService', '$window', '$state'];

function controller($mdDialog, positionService, $window, $state){
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
      template: '<new-action-item position="$ctrl.position"></new-action-item>',
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
