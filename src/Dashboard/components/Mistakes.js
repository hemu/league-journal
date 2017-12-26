import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Mistakes = ({ mistakes }) => (
  <Card raised fluid>
    <Card.Content>
      <Card.Header>Mistakes</Card.Header>
    </Card.Content>
  </Card>
);

Mistakes.propTypes = {
  mistakes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Mistakes;
