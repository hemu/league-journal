import React from 'react';
import { List, Button } from 'semantic-ui-react';
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

const LoadMoreBtn = styled(Button)`
  &&& {
    display: block;
    margin: 40px auto;
  }
`;

const EntryList = ({
  entries,
  onSelectEntry,
  selectedId,
  fetchMoreEntries,
  canLoadMore,
}) => (
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
      {canLoadMore && (
        <LoadMoreBtn onClick={() => fetchMoreEntries()}>
          Load More...
        </LoadMoreBtn>
      )}
    </GenericErrorBoundary>
  </MainCont>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEntry: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
  fetchMoreEntries: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
};

export default EntryList;
