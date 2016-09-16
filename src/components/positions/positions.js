//component for the main user page for positions
import template from './positions.html';
import styles from './positions.scss';

export default {
  template,
  controller
};

controller.$inject = ['positionService', '$window', '$mdDialog', 'companyService'];
function controller(positionService, $window, $mdDialog, companyService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  //gets all positions
  positionService.getByUser(this.userId)
    .then(positions => {
      this.positions = positions;
    })
    .catch(err => console.log(err));

  //adds new position
  this.add = (positionToAdd, userId) => {
    positionService.add(positionToAdd, userId)
    .then(addedPosition => {
      this.positions.unshift(addedPosition);
    })
    .catch(err => {
      console.log('error adding position:');
      console.log(err);
    });
  };

  //removes selected postion
  this.remove = positionId => {
    positionService.remove(positionId)
    .then(() => {
      positionService.getByUser(this.userId)
      .then(positions => {
        this.positions = positions;
      });
    })
    .catch(err => {
      console.log('error removing position:');
      console.log(err);
    });
  };

  //opens dialog/form to add a new position
  this.newPosition = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-position companies="$ctrl.companies" add="$ctrl.add" position="$ctrl.position"></new-position>',
      controller() {},
      locals: {
        position: this.position,
        add: this.add,
        companies: this.companies
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(newPosition => {
      if(!newPosition) return;
      angular.copy(newPosition, this.position);
    });
  };

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

};
