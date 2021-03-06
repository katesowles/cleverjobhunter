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

    getDueAndOverdue (userId) {
      return $http.get(`${apiUrl}/actionItems/byUser/${userId}/overdue`)
        .then(response => response.data);
    },

    getByPosOrComp (which, id) {
      return $http.get(`${apiUrl}/actionItems/byPosOrComp/${id}/${which}`)
        .then(response => response.data);
    },

    // getCountForWeek (userId) {
    //   return $http.get(`${apiUrl}/actionItems/byUser/${userId}/actionItemCount`)
    //     .then(response => response.data.count);
    // },

    addForPosOrComp (actionItem, userId) {
      return $http.post(`${apiUrl}/actionItems/${userId}`, actionItem)
        .then(response => response.data);
    }, 

    // addPositionItem (actionItem, positionId, userId) {
    //   return $http.post(`${apiUrl}/actionItems/${positionId}/${userId}`, actionItem)
    //     .then(response => response.data);
    // },

    // addCompanyItem (actionItem, companyId, userId) {
    //   return $http.post(`${apiUrl}/actionItems/company/${companyId}/${userId}`, actionItem)
    //     .then(response => console.log('after actionItem service'));
    // },

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
