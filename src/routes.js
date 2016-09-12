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
          component: 'landing'
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
          component: 'header'
        },
        main: {
          component: 'listCompanies'
        },
        footer: {
          template: '<div>Footer component will go here</div>'
        }
      }
    })
    // Will be /company/:id or /company?id once the db is set up
    .state('company', {
      url: '/company',
      views: {
        header: {
          component: 'header'
        },
        main: {
          component: 'companyDetail'
        },
        footer: {
          template: '<div>Footer component will go here</div>'
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
    .state('user', {
      url: '/user',
      views: {
        header: {
          component: 'header'
        },
        main: {
          component: 'userDetail'
        },
        footer: {
          template: '<div>Bomb Ass Job Search Footer</div>'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

};
