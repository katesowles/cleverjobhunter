import Chart from 'chart.js';

import template from './visualizations.html';
import styles from './visualizations.scss';

export default {
  template,
  controller
};

function controller() {
  this.styles = styles;

  this.renderViz = (element, objTracked, objVerb) => {
    alert('calling felicia');
    // this hides the legend on each chart
    Chart.defaults.global.legend.display = false;

    console.log('element', element);

    // this tells the chart where to render, ID for the canvas
    const context = document.getElementById(element);

    console.log('context', context);

    // eslint-disable-next-line
    const myChart = new Chart(context, {
      type: 'doughnut',
      data: {
        labels: [`${objTracked} ${objVerb}`, `${objTracked} Remaining`],
        datasets: [{
          data: [this.completedTaskCount, this.totalTaskCount - this.completedTaskCount],
          backgroundColor: ['#99cc00']
        }]
      },
      options: {
        cutoutPercentage: 75
      }
    });
  };
};
