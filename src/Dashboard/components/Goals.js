import React from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContent = styled(Card.Content)`
  &&& {
    border-top: none;
  }
`;

const Goals = ({ goals }) => (
  <Card raised fluid>
    <CardContent>
      <Card.Header>Goals</Card.Header>
    </CardContent>
    {goals.map((goal) => <CardContent>{goal}</CardContent>)}
  </Card>
);

Goals.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(() => ({
  goals: ['80 cs at 10 min', 'Only roam after pushing lane.'],
}))(Goals);
