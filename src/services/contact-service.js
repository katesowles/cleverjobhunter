//service for contact components
contactService.$inject = ['$http', 'apiUrl'];

export default function contactService ($http, apiUrl) {
  return {
    getAll () {
      return $http.get(`${apiUrl}/contacts`)
        .then(response => response.data);
    },

    get (contact) {
      return $http.get(`${apiUrl}/contacts/${contact._id}`)
        .then(response => response.data);
    },

    getByUser (userId) {
      return $http.get(`${apiUrl}/contacts/byUser/${userId}`)
        .then(response => response.data);
    },

    getCountForWeek (userId) {
      return $http.get(`${apiUrl}/contacts/byUser/${userId}/weekly`)
        .then(response => response.data.length);
    },

    add (contact, userId) {
      return $http.post(`${apiUrl}/contacts/${userId}`, contact)
        .then(response => response.data);
    },

    remove (contact) {
      return $http.delete(`${apiUrl}/contacts/${contact._id}`)
        .then(response => response.data);
    },

    update (contact) {
      return $http.put(`${apiUrl}/contacts/${contact._id}`, contact)
        .then(response => response.data);
    }
  };
}
