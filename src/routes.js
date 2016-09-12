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
    .state('position', {
      url: '/position',
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

        },
        main: {

        },
        footer: {

        }
      }
    });

  $urlRouterProvider.otherwise('/');

};
