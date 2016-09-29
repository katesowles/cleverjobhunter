import template from './signin.html';

export default {
  template,
  bindings: {
    success: '&'
  },
  controller
};

controller.$inject = ['userService'];

function controller(userService){
  this.credentials = {
    email: '',
    password: ''
  };

  this.authenticate = ()=>{
    this.error = '';
    return userService.signin(this.credentials)
      .then( result => {
        if(result.success) {
          this.success();
          return true;
        } else {
          this.error = result.error;
        }
      })
      .catch( error => {
        console.log('signin error:',error);
        return false;
      });
  };

}
