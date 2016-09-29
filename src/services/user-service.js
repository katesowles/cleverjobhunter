//service for user components
userService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function userService (token, $http, apiUrl) {
  let role = 'user'; //default
  const current = token.get();

  if (current) {
    $http.get(`${apiUrl}/auth/verify`)
    .then( result => {
      role = result.data.role;
      console.log('User verified. Role:',role);
    })
    .catch(() => token.remove());
  }

  function credential (endpoint) {
    return (credentials) => {
      return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
        .then( result => {
          if(result && result.data) {
            if(result.data.token) {
              token.set(result.data.token);
              return {success: true};
            } else
            if(result.data.error) {
              return {error: result.data.error};
            } else {
              return {error: 'Credential check failed. Unknown error in userService.'};
            }
          } else {
            console.log('Error requesting credential check: No data returned.');
          }
        })
        .catch( err => {
          console.log('Error requesting credential check:',err.data);
          throw err.data;
        });
    };
  }

  function get() {
    return $http.get(`${apiUrl}/users/`)
      .then(result => result.data);
  };

  function getMe(id) {
    return $http.get(`${apiUrl}/users/${id}`)
      .then(result => result.data);
  };

  function update(userToUpdate, data) {
    return $http.put(`${apiUrl}/users/${userToUpdate._id}`, data)
      .then(result => {
        return result.data;
      });
  };

  return {
    //do we have token?
    isAuthenticated() {
      return !!token.get();
    },
    //is current user admin?
    isAdmin() {
      return role === 'admin';
    },
    //remove token
    logout() {
      token.remove();
    },
    //call API and set token
    signin: credential('signin'),
    signup: credential('signup'),
    //update user information
    update,
    //get current user information
    getMe,
    //get all users
    get
  };
}
