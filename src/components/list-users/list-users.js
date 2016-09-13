//component for the user's companies page
import template from './list-users.html';
import styles from './list-users.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService'];
function controller(userService){
  this.styles = styles;
  
  //gets all users
  userService.get()
  .then( users => {
    this.users = users;
  })
  .catch(err => console.log(err));

  //removes a selected user
  this.deactivate = userId => {
    console.log(userId);
    userService.update(userId, {active: false})
    .then( () => {
      // success condition result goes here
    })
    .catch( err => console.log(err) );
  };

  //removes a selected user
  this.reactivate = userId => {
    console.log(userId);
    userService.update(userId, {active: true})
    .then( () => {
      // success condition result goes here
    })
    .catch( err => console.log(err) );
  };

}