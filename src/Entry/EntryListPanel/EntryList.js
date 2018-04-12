import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isLocalEntry } from '../../helpers';
import { entryListPanelColors } from '../../const/colors';
import { GenericErrorBoundary } from '../../Error';
import EntryListItem from './EntryListItem';

const MainCont = styled.div`
  padding: 20px 0;
  background-color: ${entryListPanelColors.bg};
`;

const EntryList = ({ entries, onSelectEntry, selectedId }) => (
  <MainCont>
    <GenericErrorBoundary>
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
    </GenericErrorBoundary>
  </MainCont>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEntry: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
};

export default EntryList;
