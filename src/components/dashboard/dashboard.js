import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  controller
};

controller.$inject = ['$window', 'companyService', 'contactService', 'positionService', 'actionItemService' ];
function controller($window, companyService, contactService, positionService, actionItemService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  actionItemService.getDueAndOverdue(this.userId)
  .then(items => {
    console.log('get due and overdue called');
    console.log(items);
    this.almostDue = items.almostDue;
    this.overDue = items.overDue;
  })
  .catch(err => {
    console.log(err);
  });

  this.complete = (id, category) => {
    console.log(id);
    console.log(category);
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

}
