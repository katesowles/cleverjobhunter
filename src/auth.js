auth.$inject = ['$rootScope', 'userService', '$mdDialog', '$state'];

export default function auth($rootScope, userService, $mdDialog, $state) {
  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    event.preventDefault();

    $mdDialog.show({
      parent: angular.element(document.body),
      targetEvent: event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<user-auth success="success()" cancel="cancel()"></user-auth>',
      controller: ['$scope', ($scope) => {
        $scope.success = () => {
          $mdDialog.hide();
          return $state.go(toState.name, toParams);
        };
        $scope.cancel = () => {
          $mdDialog.hide();
        };
      }],
      clickOutsideToClose: true,
      escapeToClose: true
    });
  });
};