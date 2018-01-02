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
`;

const UnmarkedIcon = styled(Icon)`
  color: #ddd;
`;

const Star = ({ marked }) =>
  (marked ? <MarkedIcon name="star" /> : <UnmarkedIcon name="empty star" />);

const MarkableList = ({ items }) => (
  <StyledList>
    {items.map(item => (
      <ListItem>
        <div>{item.text}</div>
        <StarCont>
          <Star />
        </StarCont>
      </ListItem>
    ))}
  </StyledList>
);

export default MarkableList;
