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

  //gets the detailed info of selected position
  positionService.get($state.params.positionId)
    .then(position => {
      position.dateApplied = $window.moment(position.dateApplied).format('MM-DD-YYYY');
      position.dateAdvertised = $window.moment(position.dateAdvertised).format('MM-DD-YYYY');
      this.position = position;
    })
    .catch(err => console.log(err));

  this.edit = ()=>{
    //console.log(this.position);
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
    // .then( updatedContact => {
    //   if (!updatedContact) return;
    //   //pass copied and updated version to original
    //   angular.copy(updatedContact, this.contact);
    // });
  };

}
