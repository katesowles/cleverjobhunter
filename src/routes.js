configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function configRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    // this is "home" state displays by default, also when no token is found
    .state('home', {
      url: '/',
      views: {
        header: {
          component: 'headerLogout'
        },
        main: {
          component: 'landing'
        },
        footer: {
          template: '<div>Bomb Ass Job Search Footer</div>'
        }
      }
    })
    // this is "home" state when valid token is found -- CAN WE STILL USE URL: '/', THE DIFFERENCE BEING THAT AUTH IS REQUIRED HERE WHEREAS IT'S NOT ABOVE?
    .state('welcome', {
      url: '/welcome',
      views: {
        header: {
          component: 'headerLogin'
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
          component: 'headerLogin'
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
          component: 'headerLogin'
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
          component: 'headerLogin'
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
          component: 'headerLogin'
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
          component: 'headerLogin'
        },
        main: {

        },
        footer: {

        }
      }
    })
    .state('user', {
      url: '/user',
      views: {
        header: {
          component: 'headerLogin'
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
