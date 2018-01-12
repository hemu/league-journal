import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import EntryList from '../components/EntryList';
import { RequestStatus } from '../../const';
import { setEntryDetailId, addEntry } from '../../modules/entry';
import { entryFormInitialState } from '../../modules/entryForm';

import { allEntriesQuery, createEntryMutation } from '../../api/entry';

const EntryListContainer = ({
  data: { loading, allEntries, error },
  setEntryDetailId: _setEntryDetailId,
  createEntry,
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
      createEntry={createEntry}
    />
  );
};

EntryListContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  setEntryDetailId: PropTypes.func.isRequired,
  createEntry: PropTypes.func.isRequired,
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
  graphql(createEntryMutation, {
    props: ({ mutate }) => ({
      createEntry: (defaultVals = {}) =>
        mutate({
          variables: {
            ...entryFormInitialState,
            gameDate: new Date(),
            ...defaultVals,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createEntry: {
              __typename: 'Entry',
              id: 'TEMP_LOCAL_ID',
              ...entryFormInitialState,
              gameDate: new Date(),
              ...defaultVals,
            },
          },
          update: (proxy, { data: { createEntry } }) => {
            // Read the data from our cache for this query.
            const data = proxy.readQuery({
              query: allEntriesQuery,
              // variables: { entryId },
            });
            // Add our comment from the mutation to the end.
            data.allEntries.push(createEntry);
            // Write our data back to the cache.
            proxy.writeQuery({
              query: allEntriesQuery,
              data,
            });
          },
        }),
    }),
  }),
  connect(null, dispatch => ({
    setEntryDetailId: entryId => dispatch(setEntryDetailId(entryId)),
    // addEntry: () => dispatch(addEntry()),
  })),
)(EntryListContainer);
