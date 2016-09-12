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
    .state('companies', {
      url: '/companies',
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

        },
        main: {

        },
        footer: {

        }
      }
    })
    .state('contacts', {
      url: '/contacts',
      views: {
        header: {
          component: 'header'
        },
        main: {
          component: 'contacts'
        },
        footer: {
          template: '<h3>Footer</h3>'
        }
      }
    })
    .state('userDetail', {
      url: '/userDetail',
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
