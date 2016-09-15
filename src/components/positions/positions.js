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
  this.addButton = 'add';

  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  //gets all positions
  positionService.getByUser(this.userId)
    .then(positions => {
      this.positions = positions;
      console.log(this.positions);
    })
    .catch(err => console.log(err));

  //adds new position
  this.add = (positionToAdd, userId) => {
    positionService.add(positionToAdd, userId)
      .then(addedPosition => {
        this.positions.unshift(addedPosition);
        this.addButton = 'add';
      })
      .catch(err => console.log(err));
  };

  //removes selected postion
  this.remove = positionId => {
    positionService.remove(positionId)
      .then(() => {
        positionService.getByUser(this.userId)
          .then(positions => {
            this.positions = positions;
          })
    .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
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

    console.log('this.positions',this.positions);

    saveToCsv(this.positions, headerList, 'default.csv');

    function saveToCsv(dataRows, columnHeaders, filename) {


      dataRows = dataRows.map(function(dataRow) {
        var array = [];

        array.push(dataRow._id || '' );
        array.push(dataRow.title || '' );
        dataRow.company ? array.push(dataRow.company.name || '' ) : array.push('');
        array.push(dataRow.dateAdvertised || '' );
        array.push(dataRow.dateApplied || '' );
        array.push(dataRow.method || '' );
        array.push(dataRow.postingInfo || '' );

        return array.join(',');
      }).join('\n\n');

      console.log('dataRows',dataRows);

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
  }

};
