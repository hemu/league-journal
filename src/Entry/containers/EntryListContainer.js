import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import EntryList from '../components/EntryList';
import { RequestStatus } from '../../const';
import { setEntryDetailId, addEntry } from '../../modules/entry';

import { allEntriesQuery } from '../../api/entry';

const EntryListContainer = ({
  data: { loading, allEntries, error },
  setEntryDetailId: _setEntryDetailId,
  addEntry: _addEntry,
}) => {
  if (loading) {
    return <div>Finding entries...</div>;
  }

  if (!allEntries) {
    return <div>No entries</div>;
  }

  return (
    <EntryList
      entries={allEntries}
      onSelectEntry={_setEntryDetailId}
      addEntry={_addEntry}
    />
  );
};

EntryListContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEntryDetailId: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
};

// export default connect(
//   ({ entry }) => ({
//     entries: entry.entries,
//     fetchAllStatus: entry.fetchAllStatus,
//   }),
//   dispatch => ({
//     fetchAll: () => dispatch(fetchAllEntries()),
//     setEntryDetail: (entryIndex, entryId) =>
//       dispatch(setEntryDetail(entryIndex, entryId)),
//     addEntry: () => dispatch(addEntry()),
//   }),
// )(EntryListContainer);

export default compose(
  graphql(allEntriesQuery),
  connect(null, dispatch => ({
    setEntryDetailId: entryId => dispatch(setEntryDetailId(entryId)),
    addEntry: () => dispatch(addEntry()),
  })),
)(EntryListContainer);
