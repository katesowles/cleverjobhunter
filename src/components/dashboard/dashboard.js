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
    items.almostDue.map(e => {
      e.dateDue = $window.moment(e.dateDue).format('MM-DD-YYYY');
    });
    items.overDue.map(e => {
      e.dateDue = $window.moment(e.dateDue).format('MM-DD-YYYY');
    });
    this.almostDue = items.almostDue;
    this.overDue = items.overDue;
  })
  .catch(err => {
    console.log(err);
  });

  companyService.getByUser(this.userId)
  .then( result => {
    this.numCompanies = result.length;
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
