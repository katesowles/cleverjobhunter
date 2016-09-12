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
          component: 'footer'
        }
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      views: {
        header: {
          component: 'header'
        },
        main: {
          template: '<div>Temp Dashboard Main</div>'
        },
        footer: {
          component: 'footer'
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
          component: 'footer'
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
          component: 'footer'
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
          component: 'footer'
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
          component: 'position'
        },
        footer: {
          component: 'footer'
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
          component: 'footer'
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
          component: 'footer'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

};
