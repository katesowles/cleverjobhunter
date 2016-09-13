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
  this.addButton = 'add';
  
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
        this.addButton = 'add';
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

  // this.companies = [
  //   {
  //     name: 'Apple Inc.',
  //     service: 'Computer hardware/software',
  //     location: 'Cupertino, CA',
  //     info: 'This is a company that built the iPhone and Mac OSX. They are also involved in selling digitial media view the iTunes and Mac App stores.',
  //     tech: 'iOS, Mac OSX',
  //     pros: ['pro1', 'pro2', 'pro3'],
  //     cons: ['con1', 'con2'],
  //     questions: ['question1', 'question2'],
  //     companys: [{_id: '123'}, {_id: '456'}],
  //     links: [{url: 'http://apple.com', desc: 'Apple homepage'}],
  //     actionItems: [{date: 'Aug. 10, 2016', plan: 'Applied for job'}, {date: 'Sept. 1, 2016', plan: 'First round interview'}]
  //   },
  //   {
  //     name: 'Google',
  //     service: 'Search engine',
  //     location: 'Mountain View, CA',
  //     info: 'Google started out as a search engine but has since moved onto other online software as a service products.',
  //     tech: 'AngularJS, Android',
  //     pros: ['pro1', 'pro2', 'pro3'],
  //     cons: ['con1', 'con2'],
  //     questions: ['question1', 'question2'],
  //     contacts: [{_id: '123'}, {_id: '456'}],
  //     links: [{url: 'http://google.com', desc: 'Google homepage'}],
  //     actionItems: [{date: 'Sept. 10, 2016', plan: 'Applied for job'}, {date: 'Oct. 10, 2016', plan: 'Check application status'}]
  //   },
  //   {
  //     name: 'Facebook',
  //     service: 'Social media',
  //     location: 'Menlo Park, CA',
  //     info: 'Facebook is a social media network designed to help you stay in touch with those that matter most to you.',
  //     tech: 'React',
  //     pros: ['pro1', 'pro2', 'pro3'],
  //     cons: ['con1', 'con2'],
  //     questions: ['question1', 'question2'],
  //     contacts: [{_id: '123'}, {_id: '456'}],
  //     links: [{url: 'http://facebook.com', desc: 'Facebook homepage'}],
  //     actionItems: []
  //   }
  // ];
}