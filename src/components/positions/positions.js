import template from './positions.html';

export default {
  template,
  controller
};

function controller() {
  const $ctrl = this;
  $ctrl.positions = [
    {
      title: 'abc',
      method: 'internt'
    },
    {
      title: 'xwz',
      method: 'linkein'
    }
  ];
};

  
    
  // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    
  // });