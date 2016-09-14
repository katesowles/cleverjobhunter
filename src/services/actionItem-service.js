//service for position components
actionItemService.$inject = ['$http', 'apiUrl'];

export default function actionItemService ($http, apiUrl) {
  return {
    getAll () {
      return $http.get(`${apiUrl}/actionItems`)
        .then(response => response.data);
    },

    get (actionItemId) {
      return $http.get(`${apiUrl}/actionItems/${actionItemId}`)
        .then(response => response.data);
    },

    getByUser (userId) {
      return $http.get(`${apiUrl}/actionItems/byUser/${userId}`)
        .then(response => response.data);
    },

    getCountForWeek (userId) {
      return $http.get(`${apiUrl}/actionItems/byUser/${userId}/actionItemCount`)
        .then(response => response.data.count);
    },

    add (actionItem, userId) {
      return $http.post(`${apiUrl}/actionItems/${userId}`, actionItem)
        .then(response => response.data);
    },

    remove (actionItemId) {
      return $http.delete(`${apiUrl}/actionItems/${actionItemId}`)
        .then(response => response.data);
    },

    update (actionItem) {
      return $http.put(`${apiUrl}/actionItems/${actionItem._id}`, actionItem)
        .then(response => response.data);
    }
  };
}
