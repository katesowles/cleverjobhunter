import template from './list-companies.html';
import styles from './list-companies.scss';

export default {
  template,
  controller
};

function controller(){
  this.styles = styles;
  // dummy data to remove later once services are added
  this.companies = [
    {
      name: 'Apple Inc.',
      service: 'Computer hardware/software',
      location: 'Cupertino, CA',
      info: 'This is a company that built the iPhone and Mac OSX. They are also involved in selling digitial media view the iTunes and Mac App stores.',
      tech: 'iOS, Mac OSX',
      pros: ['pro1', 'pro2', 'pro3'],
      cons: ['con1', 'con2'],
      questions: ['question1', 'question2'],
      contacts: [{_id: '123'}, {_id: '456'}],
      links: [{url: 'http://apple.com', desc: 'Apple homepage'}],
      actionItems: [{date: 'Aug. 10, 2016', plan: 'Applied for job'}, {date: 'Sept. 1, 2016', plan: 'First round interview'}]
    },
    {
      name: 'Google',
      service: 'Search engine',
      location: 'Mountain View, CA',
      info: 'Google started out as a search engine but has since moved onto other online software as a service products.',
      tech: 'AngularJS, Android',
      pros: ['pro1', 'pro2', 'pro3'],
      cons: ['con1', 'con2'],
      questions: ['question1', 'question2'],
      contacts: [{_id: '123'}, {_id: '456'}],
      links: [{url: 'http://google.com', desc: 'Google homepage'}],
      actionItems: [{date: 'Sept. 10, 2016', plan: 'Applied for job'}, {date: 'Oct. 10, 2016', plan: 'Check application status'}]
    },
    {
      name: 'Facebook',
      service: 'Social media',
      location: 'Menlo Park, CA',
      info: 'Facebook is a social media network designed to help you stay in touch with those that matter most to you.',
      tech: 'React',
      pros: ['pro1', 'pro2', 'pro3'],
      cons: ['con1', 'con2'],
      questions: ['question1', 'question2'],
      contacts: [{_id: '123'}, {_id: '456'}],
      links: [{url: 'http://facebook.com', desc: 'Facebook homepage'}],
      actionItems: []
    }
  ];
}