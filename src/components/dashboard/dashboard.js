import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  controller
};

controller.$inject = ['$window', 'companyService', 'contactService', 'positionService' ];
function controller($window, companyService, contactService, positionService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  companyService.getByUser(this.userId)
  .then( result => {
    this.numCompanies = result.length;
  });

  contactService.getByUser(this.userId)
  .then( result => {
    this.numContacts = result.length;
  });

  contactService.getCountForWeek(this.userId)
    .then( result => {
      this.contactCount = result;
    });

  positionService.getByUser(this.userId)
  .then( result => {
    this.numPositions = result.length;
  });

  positionService.getCountForWeek(this.userId)
    .then( result => {
      this.positionCount = result;
    });

}
