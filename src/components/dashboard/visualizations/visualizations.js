import Chart from 'chart.js';

import template from './visualizations.html';
import styles from './visualizations.scss';

export default {
  template,
  controller
};

function controller() {
  this.styles = styles;

  this.renderViz = (element, objTracked, objVerb, completed, total) => {
    // this hides the legend on each chart
    Chart.defaults.global.legend.display = false;

    // this tells the chart where to render, ID for the canvas
    const context = document.getElementById(element);
    const remaining = completed - total;

    // eslint-disable-next-line
    const myChart = new Chart(context, {
      type: 'doughnut',
      data: {
        labels: [`${objTracked} ${objVerb}`, `${objTracked} Remaining`],
        datasets: [{
          data: [completed, remaining],
          backgroundColor: ['#99cc00']
        }]
      },
      options: {
        cutoutPercentage: 75
      }
    });
  };

  this.renderViz('application', 'Applications', 'Sent', 5, 3);

  this.renderViz('brand', 'Online Interactions', 'Complete', 8, 5);

  this.renderViz('contact', 'New Contacts', 'Made', 13, 8);

  this.renderViz('events', 'Events', 'Attended', 21, 13);


};
