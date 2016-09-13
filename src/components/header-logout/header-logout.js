import template from './header-logout.html';

export default {
  template,
  controller
};

controller.$inject = ['$state'];
function controller($state) {
  function removeToken() {
    // TODO : it token, remove token and load header-logout + landing + [footer], else load header-logout + landing + [footer]
  }

  removeToken();
};
