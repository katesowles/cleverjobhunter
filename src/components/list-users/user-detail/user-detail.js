import template from './user-detail.html';
import styles from './user-detail.scss';

export default {
  template,
  controller
};

function controller(){
  this.styles = styles;

  this.user = {
    name: 'Joe User',
    username: 'joe@email.com',
    positions: [
      {
        dateApplied: '2016-09-19',
        title: 'Web Developer',
        company: 'ABC Corp'
      },
      {
        dateApplied: '2016-09-19',
        title: 'Front-End Developer',
        company: 'XYZ Inc.'
      },
      {
        dateApplied: '2016-09-20',
        title: 'Back-End Developer',
        company: 'Cool Company'
      }
    ],
    companies: [
      {
        name: 'ABC Corp'
      },
      {
        name: 'IJK Corp'
      },
      {
        name: 'Sweet Company'
      }
    ],
    contacts: [
      {
        name: 'Jane Recruiter',
        role: 'Lead Assistant',
        company: 'Jobby Jobs'
      },
      {
        name: 'Jack',
        role: 'HR',
        company: 'Klassic Korp'
      }
    ]
  };
}
