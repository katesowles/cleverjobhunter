//service for position components
positionService.$inject = ['$http', 'apiUrl', 'companyService'];

export default function positionService ($http, apiUrl, companyService) {
  return {
    getAll () {
      return $http.get(`${apiUrl}/positions`)
        .then(response => response.data);
    },

    get (positionId) {
      return $http.get(`${apiUrl}/positions/${positionId}`)
        .then(response => response.data);
    },

    getByUser (userId) {
      return $http.get(`${apiUrl}/positions/byUser/${userId}`)
        .then(response => response.data);
    },

    getCountForWeek (userId) {
      return $http.get(`${apiUrl}/positions/byUser/${userId}/weekly`)
        .then(response => response.data.length);
    },

    add (position, userId) {
      if(position.newCompany && position.newCompany != '') {
        const company = {name: position.newCompany};
        return companyService.add(company,userId)
        .then( newCompany => {
          position.company = newCompany._id;
          return $http.post(`${apiUrl}/positions/${userId}`, position)
          .then(response => response.data);
        })
        .catch( error => response.error = error );
      } else {
        return $http.post(`${apiUrl}/positions/${userId}`, position)
        .then( response => response.data )
        .catch( error => response.error = error );
      }
    },

    remove (positionId) {
      return $http.delete(`${apiUrl}/positions/${positionId}`)
        .then(response => response.data);
    },

    update (position) {
      return $http.put(`${apiUrl}/positions/${position._id}`, position)
        .then(response => response.data);
    }
  };
}
