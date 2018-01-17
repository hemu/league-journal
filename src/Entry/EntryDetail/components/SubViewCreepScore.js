import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import SecondaryList from './SecondaryList';

const GridCont = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CreepScoreView = ({
  csReasons,
  // csPerMin,
  csAt5Min,
  csAt10Min,
  csAt15Min,
  csAt20Min,
}) => {
  const possibleLabels = [0, 5, 10, 15, 20];
  const dataPoints = [0, csAt5Min, csAt10Min, csAt15Min, csAt20Min].filter(
    (v) => v != null,
  );
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
    <GridCont>
      <SecondaryList items={csReasons} />
      <div>
        <Line data={data} options={options} />
      </div>
    </GridCont>
  );
};

CreepScoreView.propTypes = {
  csReasons: PropTypes.arrayOf(PropTypes.string).isRequired,
  // csPerMin: PropTypes.number.isRequired,
  csAt5Min: PropTypes.number.isRequired,
  csAt10Min: PropTypes.number.isRequired,
  csAt15Min: PropTypes.number.isRequired,
  csAt20Min: PropTypes.number.isRequired,
};

export default CreepScoreView;
