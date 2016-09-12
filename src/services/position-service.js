positionService.$inject = ['$http', 'apiUrl'];

export default function positionService ($http, apiUrl) {
  return {
    getAll () {
      return $http.get(`${apiUrl}/positions`)
        .then(response => response.data);
    },

    get (position) {
      return $http.get(`${apiUrl}/positions/${position._id}`)
        .then(response => response.data);
    },

    getByUser (userId) {
      return $http.get(`${apiUrl}/positions/byUser/${userId}`)
        .then(response => response.data);
    },

    add (position, userId) {
      return $http.post(`${apiUrl}/positions/${userId}`, position)
        .then(response => response.data);
    },

    remove (position) {
      return $http.delete(`${apiUrl}/positions/${position._id}`)
        .then(response => response.data);
    },

    update (position) {
      return $http.put(`${apiUrl}/positions/${position._id}`, position)
        .then(response => response.data);
    }
  };
}
