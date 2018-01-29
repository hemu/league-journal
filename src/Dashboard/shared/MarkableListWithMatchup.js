import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

import { entryColors } from '../../const/colors';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 7fr 3fr 1fr;
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

const EndCont = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const KDACont = styled.div`
  font-size: 12px;
  line-height: 12px;
  align-self: end;
  text-align: center;
`;

const DateCont = styled.div`
  font-size: 10px;
  line-height: 12px;
  color: #999;
  align-self: start;
  text-align: center;
  font-style: italic;
`;

const Star = ({ marked, onClick }) => {
  if (marked) {
    return <MarkedIcon name="star" onClick={onClick} />;
  }
  return <UnmarkedIcon name="empty star" onClick={onClick} />;
};

Star.propTypes = {
  marked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const MarkableListWithMatchup = ({ notes, withDate, onMark: globalOnMark }) => (
  <StyledList>
    {notes.map(
      ({
        id,
        text,
        marked,
        entry: { champion, opponentChampion, gameDate },
        onMark,
      }) => (
        <ListItem key={id}>
          <div>{text}</div>
          <EndCont>
            <KDACont>{`${champion} vs ${opponentChampion}`}</KDACont>
            {withDate ? <DateCont>{moment(gameDate).fromNow()}</DateCont> : ''}
          </EndCont>
          <StarCont>
            <Star
              marked={marked}
              onClick={
                globalOnMark
                  ? () => globalOnMark(id, !marked)
                  : () => onMark(id, !marked)
              }
            />
          </StarCont>
        </ListItem>
      ),
    )}
  </StyledList>
);

MarkableListWithMatchup.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      entry: PropTypes.shape({
        champion: PropTypes.string,
        opponentChampion: PropTypes.string,
        gameDate: PropTypes.string,
      }),
      marked: PropTypes.bool,
      onMark: PropTypes.func,
    }),
  ).isRequired,
  withDate: PropTypes.bool.isRequired,
  onMark: PropTypes.func,
};

MarkableListWithMatchup.defaultProps = {
  onMark: null,
};

export default MarkableListWithMatchup;
