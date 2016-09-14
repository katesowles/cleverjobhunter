import template from './header.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state', '$mdDialog', '$window'];

function controller(userService, $state, $mdDialog, $window) {
  // to grab the user's display name for the 'welcome {{$ctrl.name}}'
  userService.getMe($window.localStorage.getItem('id'))
  .then(user =>{
    this.name = user.name;
  })
  .catch(err => console.log(err));

  this.logout = ()=>{
    userService.logout();
    $state.go('home');
  };

  this.isAuthenticated = userService.isAuthenticated;

  this.prompt = ()=>{
    $mdDialog.show({
      parent: angular.element(document.body),
      template: '<user-auth success="success()" cancel="cancel()"></user-auth>',
      controller: ['$scope', function($scope) {
        $scope.success = function(){
          $mdDialog.hide();
          return $state.go('dashboard');
        };
        $scope.cancel = () => {
          $mdDialog.hide();
        };
      }],
      clickOutsideToClose: true,
      escapeToClose: true
    });
  };
  
};
