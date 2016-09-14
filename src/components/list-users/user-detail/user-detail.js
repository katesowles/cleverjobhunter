import template from './user-detail.html';
import styles from './user-detail.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService', '$window', 'positionService', 'companyService', 'contactService'];
function controller(userService, $window, positionService, companyService, contactService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  userService.getMe(this.userId)
  .then( result => this.user = result )
  .catch( err => console.log(err) );

  positionService.getByUser(this.userId)
  .then( result => {
    this.positions = result;
    // this.positions.forEach( (position, index, arr) => {
    //   arr[index].dateApplied = $window.moment(position.dateApplied).format('MM-DD-YYYY'); 
    // });
  })
  .catch( err => console.log(err) );

  companyService.getByUser(this.userId)
  .then( result => this.companies = result )
  .catch( err => console.log(err) );

  contactService.getByUser(this.userId)
  .then( result => this.user.contacts = result )
  .catch( err => console.log(err) );

}
