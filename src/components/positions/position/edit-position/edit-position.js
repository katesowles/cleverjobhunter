import template from './edit-position.html';

export default {
  template,  
  bindings: {
    positionToEdit: '<position'
  },
  controller
};

controller.$inject = ['$mdDialog', 'positionService', '$state', '$window'];

function controller($mdDialog, positionService, $state, $window){

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.save = () => {
    this.position._id = $state.params.positionId;
    
    positionService.update(this.position)
      .then(updatedPosition => {
        updatedPosition.dateAdvertised = $window.moment(updatedPosition.dateAdvertised).format('MM-DD-YYYY');
        updatedPosition.dateApplied = $window.moment(updatedPosition.dateApplied).format('MM-DD-YYYY');
        $mdDialog.hide(updatedPosition);
      });
  };
}