companyService.$inject = ['$http', 'apiUrl'];

export default function companyService($http, apiUrl){
  return {
    getByUser(userId){
      return $http.get(`${apiUrl}/companies/byUser/${userId}`)
        .then(response => response.data);
    },

    add (company, userId) {
      return $http.post(`${apiUrl}/companies/${userId}`, company)
        .then(response => response.data);
    },
 
    remove (company) {
      return $http.delete(`${apiUrl}/companies/${company._id}`)
        .then(response => response.data);
    },

    update (company) {
      return $http.put(`${apiUrl}/companies/${company._id}`, company)
        .then(response => response.data);
    }
  };
}