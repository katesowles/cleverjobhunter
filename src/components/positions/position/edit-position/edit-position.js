import template from './edit-position.html';

export default {
  template,  
  bindings: {
    positionToEdit: '<position'
  },
  controller
};

function controller(){
  console.log('from edit-position' , this.positionToEdit);
}