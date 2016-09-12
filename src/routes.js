configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      views: {
        header: {
          component: 'header'
        },
        main: {
          template: '<div>Bomb Ass Job Search</div>'
        },
        footer: {
          template: '<div>Bomb Ass Job Search Footer</div>'
        }
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      views: {
        header: {

        },
        main: {

        },
        footer: {
          
        }
      }
    })
    .state('company', {
      url: '/company',
      views: {
        header: {

        },
        main: {

        },
        footer: {
          
        }
      }
    })
    .state('positions', {
      url: '/positions',
      views: {
        header: {
          component: 'header'
        },
        main: {
          component: 'positions'
        },
        footer: {
          template: '<div>Bomb Ass Job Search Footer</div>'
        }
      }
    })
    .state('position', {
      url: '/position',
      views: {
        header: {
          component: 'header'
        },
        main: {
          component: 'position-info'
        },
        footer: {
          template: '<div>Bomb Ass Job Search Footer</div>'
        }
      }
    })
    .state('contacts', {
      url: '/contacts',
      views: {
        header: {

        },
        main: {

        },
        footer: {
          
        }
      }
    });

  $urlRouterProvider.otherwise('/');
    
};