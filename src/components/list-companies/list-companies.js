//component for the user's companies page
import template from './list-companies.html';
import styles from './list-companies.scss';

export default {
  template,
  controller
};

controller.$inject = ['companyService', '$window', '$mdDialog'];
function controller(companyService, $window, $mdDialog){
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  
  //gets all of user's companies
  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  //adds a new company
  this.add = (companyToAdd, userId) => {
    companyService.add(companyToAdd, userId)
      .then(addedcompany => {
        this.companies.unshift(addedcompany);
      })
      .catch(err => console.log(err));
  };

  //removes a selected company
  this.remove = companyId => {
    console.log(companyId);
    companyService.remove(companyId)
        .then(() => {
          companyService.getByUser(this.userId)
            .then(companies => {
              this.companies = companies;
            })
      .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
  };

  //opens new Dialog/form to add a new company
  this.newCompany = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-company add="$ctrl.add" company="$ctrl.company"></new-company>',
      controller() {},
      locals: {
        company: this.company,
        add: this.add
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(newCompany => {
      if(!newCompany) return;
      console.log(newCompany);
      angular.copy(newCompany, this.company);
    });
  };

// TODO: customize
  this.exportToCSV = function() {

    const headerList = [
      '_id',
      'title',
      'company_name',
      'dateAdvertised',
      'dateApplied',
      'method',
      'postingInfo',
    ];

    const exportArray = this.positions.map( position => {
      var array = [];
      array.push(position._id || '' );
      array.push(position.title || '' );
      position.company ? array.push(position.company.name || '' ) : array.push('');
      array.push(position.dateAdvertised || '' );
      array.push(position.dateApplied || '' );
      array.push(position.method || '' );
      position.questions ? array.push(position.questions.join('\n') || '' ) : array.push('');
      array.push(position.postingInfo || '' );
      return array.join(',');
    }).join('\n');

    saveToCsv(exportArray, headerList, 'positions.csv');

    function saveToCsv(dataRows, columnHeaders, filename) {

      var content =
          'data:text/csv;charset=utf-8,' +
          columnHeaders.join(',') + '\n' +
          dataRows;
              
      var encodedUri = encodeURI(content);

      // faux link is required to give the file a name
      var link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);

      link.click();
    }
  };

}