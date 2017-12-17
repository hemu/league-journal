import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const EntryListItem = ({
  entry, isLocalEntry, active, entryIndex,
}) =>
  (isLocalEntry ? (
    <List.Item data-id={entry.id} active={active} data-entry-index={entryIndex}>
      New Entry (Unsaved)
    </List.Item>
  ) : (
    <List.Item data-id={entry.id} active={active} data-entry-index={entryIndex}>
      {entry.champion || 'Unknown'} vs {entry.opponentChampion || 'Unknown'}
    </List.Item>
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
