configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

//routing for app
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
          component: 'footer'
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
          component: 'footer'
        }
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      data: {
        requiresAuth: true
      },
      views: {
        header: {
          component: 'headerLogin'
        },
        main: {
          component: 'dashboard'
        },
        footer: {
          component: 'footer'
        }
      }
    })
    .state('companies', {
      url: '/companies',
      data: {
        requiresAuth: true
      },
      views: {
        header: {
          component: 'headerLogin'
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
      url: '/company/:companyId',
      resolve: {
        companyId: ['$stateParams', p => p.companyId]
      },
      data: {
        requiresAuth: true
      },
      views: {
        header: {
          component: 'headerLogin'
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
      data: {
        requiresAuth: true
      },
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
      url: '/position/:positionId',
      resolve: {
        positionId: ['$stateParams', p => p.positionId]
      },
      data: {
        requiresAuth: true
      },
      views: {
        header: {
          component: 'headerLogin'
        },
        main: {
          component: 'position'
        },
        footer: {
          component: 'footer'
        }
        // params: {
        //   display: {dynamic: true}
        // }
      }
    })
    .state('contacts', {
      url: '/contacts',
      data: {
        requiresAuth: true
      },
      views: {
        header: {
          component: 'headerLogin'
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
      data: {
        requiresAuth: true
      },
      views: {
        header: {
          component: 'headerLogin'
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
