import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const CreepScoreView = ({ creepScore }) => {
  const dataPoints = [[0, 0], ...creepScore].filter((v) => v != null);
  const labels = dataPoints.map(([min, score]) => min);
  const values = dataPoints.map(([min, score]) => score);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        lineTension: 0,
        backgroundColor: '#FFBE85',
        fill: false,
        borderColor: '#E07719',
        pointRadius: 6,
        pointBackgroundColor: '#FFBE85',
        pointBorderColor: '#E07719',
        pointBorderWidth: 2,
      },
      {
        data: [0, 50, 100, 150, 200],
        label: 'Target CS: 10/min',
        fill: false,
        backgroundColor: '#FFF',
        borderColor: '#AAA',
        lineTension: 0,
        borderDash: [5, 10],
        pointRadius: 0,
      },
    ],
  };

  const maxValueToNearestTwenty =
    Math.ceil(values[values.length - 1] / 20) * 20;

  const options = {
    title: {
      display: false,
      text: 'Early Game CS',
    },
    legend: {
      display: true,
      labels: {
        filter(legendItem) {
          // return true or false based on legendItem's
          // datasetIndex (legendItem.datasetIndex)
          return legendItem.datasetIndex !== 0;
        },
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          // scaleLabel: {
          //   display: true,
          //   labelString: 'Minutes',
          // },
          ticks: {
            min: 0,
            max: 20,
            stepSize: 5,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: maxValueToNearestTwenty,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

CreepScoreView.propTypes = {
  creepScore: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default CreepScoreView;
