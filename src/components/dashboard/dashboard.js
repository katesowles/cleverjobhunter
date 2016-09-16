import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  controller
};

controller.$inject = ['$window', 'companyService', 'contactService', 'positionService', 'actionItemService', '$mdDialog', '$state' ];
function controller($window, companyService, contactService, positionService, actionItemService, $mdDialog, $state){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  actionItemService.getDueAndOverdue(this.userId)
  .then(items => {
    this.almostDue = items.almostDue;
    this.overDue = items.overDue;
  })
  .catch(err => {
    console.log(err);
  });

  this.complete = (id, category) => {
    actionItemService.remove(id)
    .then(removed => {
      if (category === 'due') {
        this.almostDue.forEach((e,i) => {
          if (id === e._id) {
            this.almostDue.splice(i, 1);
          }
        });
      } else {
        this.overDue.forEach((e,i) => {
          if (id === e._id) {
            this.overDue.splice(i, 1);
          }
        });
      }
      console.log(removed);
    });
  };

  companyService.getByUser(this.userId)
  .then( result => {
    this.companies = result;
    this.numCompanies = result.length;
  })
  .catch(err => {
    console.log(err);
  });

  companyService.getCountForWeek(this.userId)
    .then( result => {
      this.companyCount = result;
    })
    .catch(err => {
      console.log(err);
    });

  contactService.getByUser(this.userId)
  .then( result => {
    this.numContacts = result.length;
  })
  .catch(err => {
    console.log(err);
  });

  contactService.getCountForWeek(this.userId)
    .then( result => {
      this.contactCount = result;
    })
    .catch(err => {
      console.log(err);
    });

  positionService.getByUser(this.userId)
  .then( result => {
    this.positions = result;
    this.numPositions = result.length;
  })
  .catch(err => {
    console.log(err);
  });

  positionService.getCountForWeek(this.userId)
    .then( result => {
      this.positionCount = result;
    })
    .catch(err => {
      console.log(err);
    });


  //adds new position
  this.addPosition = (positionToAdd, userId) => {
    positionService.add(positionToAdd, userId)
      .then(addedPosition => {
        this.positions.unshift(addedPosition);
      })
      .catch(err => console.log(err));
  };

  //opens dialog/form to add a new position
  this.newPosition = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-position companies="$ctrl.companies" add="$ctrl.add" position="$ctrl.position"></new-position>',
      controller() {},
      locals: {
        position: this.position,
        add: this.addPosition,
        companies: this.companies
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(newPosition => {
      if(!newPosition) return;
      $state.go('positions');
    });
  };

  //adds a new company
  this.addCompany = (companyToAdd, userId) => {
    companyService.add(companyToAdd, userId)
      .then(addedcompany => {
        this.companies.unshift(addedcompany);
      })
      .catch(err => console.log(err));
  };

  //opens new Dialog/form to add a new company
  this.newCompany = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-company add="$ctrl.add" company="$ctrl.company"></new-company>',
      controller() {},
      locals: {
        company: this.company,
        add: this.addCompany
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(newCompany => {
      if(!newCompany) return;
      $state.go('companies');
    });
  };

    //adds a contact
  this.addContact = (contactToAdd, userId) => {
    contactService.add(contactToAdd, userId)
      .catch(err => console.log(err));
  };

  //opens dialog/form to add a new contact
  this.newContact = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-contact companies="$ctrl.companies" add="$ctrl.add" contact="$ctrl.contact"></new-contact>',
      controller() {},
      locals: {
        contact: this.contact,
        add: this.addContact,
        companies: this.companies
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(addContact => {
      if(!addContact) return;
      $state.go('contacts');
    });
  };
}
