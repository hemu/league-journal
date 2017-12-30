import React from 'react';
import PropTypes from 'prop-types';

const ListView = ({ items }) => <ul>{items.map(item => <li>{item}</li>)}</ul>;

ListView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListView;
