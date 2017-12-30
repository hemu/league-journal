import React from 'react';
import { List, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isLocalEntry } from '../../helpers';
import EntryListItem from './EntryListItem';

const MainCont = styled.div`
  padding: 20px;
`;

const EntryList = ({ entries, onSelectEntry, addEntry }) => (
  <MainCont>
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
  </MainCont>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEntry: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
};

export default EntryList;
