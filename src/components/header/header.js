import template from './header.html';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$state', '$mdDialog'];

function controller(userService, $state, $mdDialog) {
  this.username = 'Name-Goes-Here';
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
