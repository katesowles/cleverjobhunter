configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      views: {
        header: '',
        main: '',
        footer: ''
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      views: {
        header: '',
        main: '',
        footer: ''
      }
    })
    .state('company', {
      url: '/company',
      views: {
        header: '',
        main: '',
        footer: ''
      }
    })
    .state('position', {
      url: '/position',
      views: {
        header: '',
        main: '',
        footer: ''
      }
    })
    .state('contacts', {
      url: '/contacts',
      views: {
        header: '',
        main: '',
        footer: ''
      }
    });

  $urlRouterProvider.otherwise('/');
    
};