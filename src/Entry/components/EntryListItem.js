import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import { entryColors } from '../../const/colors';

const MAX_MATCHUP_LENGTH = 26;

moment.updateLocale('en', {
  relativeTime: {
    s: 'seconds',
  },
});

const ListItemCont = styled.div`
  display: grid;
  cursor: pointer;
  grid-template-columns: 25px auto 70px;
  align-items: center;
  width: 100%;
  height: 36px;
  color: #ccc;
  :hover {
    background-color: #42535c;
  }
  .active {
    color: #fff;
  }
  .active-secondary {
    color: #eee;
  }
`;

const WinIndicator = styled(Icon)`
  color: ${entryColors.win};
`;

const LossIndicator = styled(Icon)`
  color: ${entryColors.loss};
`;

const EndCont = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const MatchupText = styled.div`
  font-size: 13px;
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

const matchup = (champion, opponentChampion) => {
  const text = `${champion || 'Unknown'} vs ${opponentChampion || 'Unknown'}`;
  console.log(text.length);
  console.log(text.length > MAX_MATCHUP_LENGTH);
  console.log(`${text.substring(0, MAX_MATCHUP_LENGTH - 3)}...`);
  return text.length > MAX_MATCHUP_LENGTH
    ? `${text.substring(0, MAX_MATCHUP_LENGTH - 3)}...`
    : text;
};

const ListItem = ({
  isLocalEntry, entry, active, entryIndex, onSelect,
}) => (
  <ListItemCont
    data-id={entry.id}
    active={active}
    data-entry-index={entryIndex}
    onClick={onSelect}
  >
    <div>
      {entry.outcome === 'W' ? (
        <WinIndicator name="circle" />
      ) : (
        <LossIndicator name="circle thin" />
      )}
    </div>
    <MatchupText>
      {isLocalEntry
        ? 'New (Unsaved)'
        : matchup(entry.champion, entry.opponentChampion)}
    </MatchupText>
    <EndCont>
      <KDACont>
        {entry.kills}/{entry.deaths}/{entry.assists}
      </KDACont>
      <DateCont>{moment(entry.gameDate).fromNow()}</DateCont>
    </EndCont>
  </ListItemCont>
);

const EntryListItem = ({
  entry, isLocalEntry, active, entryIndex, onSelect,
}) =>
  (isLocalEntry ? (
    <ListItem
      isLocalEntry={isLocalEntry}
      entry={entry}
      active
      entryIndex={entryIndex}
      onSelect={() => onSelect(entryIndex, entry.id)}
    />
  ) : (
    <ListItem
      entry={entry}
      active
      entryIndex={entryIndex}
      onSelect={() => onSelect(entryIndex, entry.id)}
    />
  ));

EntryListItem.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string,
    champion: PropTypes.string,
    opponentChampion: PropTypes.string,
  }).isRequired,
  isLocalEntry: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  entryIndex: PropTypes.number.isRequired,
};

export default EntryListItem;
