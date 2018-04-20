import React from 'react';
import { List, Button, Dropdown, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isLocalEntry } from '../../helpers';
import { entryListPanelColors } from '../../const/colors';
import { GenericErrorBoundary } from '../../Error';
import EntryListItem from './EntryListItem';
import { champOptions } from '../../staticData';

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

const FilterDropdown = styled(Dropdown)`
  &&&& {
    background-color: #535c5f;
    border: none;
    color: #AAAAAA;
    input {
      color: #AAAAAA;
    }
    margin: 0 auto;
    width: 85%;
    text-align: center;
  }
  &&&&:hover {
    border: none;
  }
`;

const LoaderCont = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 50px;
`;

const NoChampMsg = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  color: #bfbfbfde;
`;

const Title = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 0;
  color: #CCCCCC;
`;

const dropdownOptions = [
  {
    text: 'All',
    value: '',
  },
  ...champOptions,
];

const ListDisplay = ({ entries, onSelectEntry, selectedId, champFilter }) => (
  <List selection>
    {(!entries || entries.length === 0) && champFilter ? (
      <NoChampMsg>There aren't any {champFilter} entries yet.</NoChampMsg>
    ) : (
      entries.map((entry, i) => (
        <EntryListItem
          key={entry.id + entry.gameDate.toString()}
          entry={entry}
          entryIndex={i}
          active={selectedId === entry.id}
          isLocalEntry={isLocalEntry(entry.id)}
          onSelect={onSelectEntry}
        />
      ))
    )}
  </List>
);

ListDisplay.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEntry: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
  champFilter: PropTypes.bool.isRequired,
};

const EntryList = (props) => {
  const {
    entries,
    onSelectEntry,
    selectedId,
    fetchMoreEntries,
    canLoadMore,
    setChampFilter,
    champFilter,
    loading,
  } = props;

  return (
    <MainCont>
      <GenericErrorBoundary>
        <Title>Entries</Title>
        <FilterDropdown
          placeholder="Filter by Champion"
          fluid
          search
          selection
          options={dropdownOptions}
          onChange={(e, data) => setChampFilter(data.value)}
        />
        {loading ? (
          <LoaderCont>
            <Loader size="small" active inline />
          </LoaderCont>
        ) : (
          <ListDisplay
            entries={entries}
            onSelectEntry={onSelectEntry}
            selectedId={selectedId}
            champFilter={champFilter}
          />
        )}
        {canLoadMore && (
          <LoadMoreBtn onClick={() => fetchMoreEntries()}>
            Load More...
          </LoadMoreBtn>
        )}
      </GenericErrorBoundary>
    </MainCont>
  );
};

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEntry: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
  fetchMoreEntries: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
  setChampFilter: PropTypes.func.isRequired,
  champFilter: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EntryList;
