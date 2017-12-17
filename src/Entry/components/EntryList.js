import React from 'react';
import { List, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isLocalEntry } from '../../helpers';
import EntryListItem from './EntryListItem';

const EntryList = ({ entries, onSelectEntry, addEntry }) => (
  <div>
    <Header>Entries</Header>
    <Button type="submit" onClick={addEntry} size="tiny">
      New Entry
    </Button>
    <List
      selection
      onClick={(event, _) => {
        onSelectEntry(
          parseInt(event.target.dataset.entryIndex, 10),
          event.target.dataset.id,
        );
      }}
    >
      {entries.map((entry, i) => (
        <EntryListItem
          key={entry.id + i}
          entry={entry}
          entryIndex={i}
          // active={entryDetailStore.id === entry.id}
          isLocalEntry={isLocalEntry(entry.id)}
        />
      ))}
    </List>
  </div>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEntry: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
};

export default EntryList;
