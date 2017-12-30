import React from 'react';
import { Line } from 'react-chartjs-2';
import ViewList from './SubViewList';

const CreepScoreView = ({
  csReasons,
  csPerMin,
  csAt5Min,
  csAt10Min,
  csAt15Min,
  csAt20Min,
}) => {
  const possibleLabels = [0, 5, 10, 15, 20];
  const dataPoints = [0, csAt5Min, csAt10Min, csAt15Min, csAt20Min].filter(v => v != null);
  const labels = dataPoints.map((v, i) => possibleLabels[i]);

  const data = {
    labels,
    datasets: [
      {
        // data: [
        //   { x: 0, y: 0 },
        //   { x: 5, y: 20 },
        //   { x: 10, y: 35 },
        //   { x: 15, y: 40 },
        //   { x: 20, y: 80 },
        // ],
        data: dataPoints,
        lineTension: 0,
        backgroundColor: '#FFBE85',
        fill: false,
        borderColor: '#E07719',
        pointRadius: 6,
        pointBackgroundColor: '#FFBE85',
        pointBorderColor: '#E07719',
        pointBorderWidth: 2,
        // label: 'My CS',
      },
      {
        data: [0, 40, 80, 120, 160],
        label: 'Target CS: 8/min',
        fill: false,
        backgroundColor: '#FFF',
        borderColor: '#AAA',
        lineTension: 0,
        borderDash: [5, 10],
        pointRadius: 0,
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: 'Early Game CS',
    },
    legend: {
      display: true,
      labels: {
        filter(legendItem) {
          return legendItem.datasetIndex !== 0;
          // return true or false based on legendItem's datasetIndex (legendItem.datasetIndex)
        },
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Minutes',
          },
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
          },
        },
      ],
    },
  };

  return (
    <div>
      <ViewList items={csReasons} />
      <Line data={data} options={options} />
    </div>
  );
};

export default CreepScoreView;
