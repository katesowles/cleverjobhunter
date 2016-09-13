import template from './contacts.html';
import styles from './contacts.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['contactService', '$window', 'companyService'];
function controller (contactService, $window, companyService) {
  this.styles = styles;
  this.addButton = 'add';
  this.userId = $window.localStorage['id'];

  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  contactService.getByUser(this.userId)
    .then(contacts => {
      contacts.map(e => {
        moment(e.dateMet).format('dddd, MMMM Do YYYY');
      });
      this.contacts = contacts;

    })
    .catch(err => console.log(err));

  this.add = (contactToAdd, userId) => {
    contactService.add(contactToAdd, userId)
      .then(addedContact => {
        this.contacts.unshift(addedContact);
        this.addButton = 'add';
      })
      .catch(err => console.log(err));
  };

  this.remove = contactId => {
    contactService.remove(contactId)
      .then(message => console.log(message))
      .catch(err => console.log(err));
  };

};
