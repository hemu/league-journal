import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { entryColors } from '../../../const/colors';

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

const StarCont = styled.div`
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

const Star = ({ marked, onClick }) =>
  (marked ? (
    <MarkedIcon name="star" onClick={onClick} />
  ) : (
    <UnmarkedIcon name="empty star" onClick={onClick} />
  ));

const MarkableList = ({ items, onMark }) => (
  <StyledList>
    {items.map(item => (
      <ListItem key={item.id}>
        <div>{item.text}</div>
        <StarCont>
          <Star
            marked={item.marked}
            onClick={() => onMark(item.id, !item.marked)}
          />
        </StarCont>
      </ListItem>
    ))}
  </StyledList>
);

export default MarkableList;
