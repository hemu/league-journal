import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 10px;
`;

const ListItem = styled.li`
  padding: 5px 0;
  font-size: 13px;
`;

const ListView = ({ items }) => (
  <StyledList>
    {items.map(item => (
      <ListItem>
        <div>{item}</div>
      </ListItem>
    ))}
  </StyledList>
);

ListView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListView;
