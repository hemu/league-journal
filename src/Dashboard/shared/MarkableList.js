import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { entryColors } from '../../const/colors';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 9fr 1fr;
  padding: 5px 0;
`;

const PinCont = styled.div`
  justify-content: center;
`;

const MarkedIcon = styled(Icon)`
  color: ${entryColors.orange};
  cursor: pointer;
`;

const UnmarkedIcon = styled(Icon)`
  color: #ddd;
  cursor: pointer;
`;

const Pin = ({ marked, onClick }) => {
  if (marked) {
    return <MarkedIcon name="star" onClick={onClick} />;
  }
  return <UnmarkedIcon name="empty star" onClick={onClick} />;
};

Pin.propTypes = {
  marked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const MarkableList = ({ items, onMark }) => (
  <StyledList>
    {items.map((item) => (
      <ListItem key={item.id}>
        <div>{item.text}</div>
        <PinCont>
          <Pin
            marked={item.marked}
            onClick={() => onMark(item.id, !item.marked)}
          />
        </PinCont>
      </ListItem>
    ))}
  </StyledList>
);

MarkableList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      marked: PropTypes.bool,
    }),
  ).isRequired,
  onMark: PropTypes.func.isRequired,
};

export default MarkableList;
