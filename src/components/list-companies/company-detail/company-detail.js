import template from './company-detail.html';
import styles from './company-detail.scss';

export default {
  template,
  controller
};

function controller(){
  this.styles = styles;
  //dummy data for now, but will eventually be a company id in the bindings
  this.company = {
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
  };
}
