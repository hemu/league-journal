import React from 'react';
import { List, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isLocalEntry } from '../../helpers';
import EntryListItem from './EntryListItem';
import { grayBlue } from '../../const/colors';

const MainCont = styled.div`
  padding: 20px 8px;
  background-color: ${grayBlue};
`;

const NewEntryBtnCont = styled.div`
  text-align: center;
`;

const EntryList = ({ entries, onSelectEntry, createEntry, selectedId }) => (
  <MainCont>
    <NewEntryBtnCont>
      <Button type="submit" onClick={() => createEntry()} size="tiny">
        New Entry
      </Button>
    </NewEntryBtnCont>
    <List selection>
      {entries.map((entry, i) => (
        <EntryListItem
          key={entry.id + entry.gameDate.toString()}
          entry={entry}
          entryIndex={i}
          active={selectedId === entry.id}
          isLocalEntry={isLocalEntry(entry.id)}
          onSelect={onSelectEntry}
        />
      ))}
    </List>
  </MainCont>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEntry: PropTypes.func.isRequired,
  createEntry: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
};

export default EntryList;
