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

controller.$inject = ['positionService', '$window', '$state'];
function controller(positionService, $window, $state){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  positionService.get($state.params.positionId)
    .then(position => {
      this.position = position;
      console.log(this.position);
    })
    .catch(err => console.log(err));

}
