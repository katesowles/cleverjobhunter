positionService.$inject = ['$http', 'apiUrl'];

export default function positionService ($http, apiUrl) {
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

    add (position, userId) {
      return $http.post(`${apiUrl}/positions/${userId}`, position)
        .then(response => response.data);
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
