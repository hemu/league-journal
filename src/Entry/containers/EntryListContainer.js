import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import EntryList from '../components/EntryList';
import { setEntryDetailId } from '../../modules/entry';
import { entryFormInitialState } from '../../modules/entryForm';

import { allEntriesQuery, createEntryMutation } from '../../api/entry';

const EntryListContainer = ({
  data: { loading, allEntries },
  setEntryDetailId: _setEntryDetailId,
  createEntry,
  selectedId,
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
      selectedId={selectedId}
    />
  );
};

EntryListContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  setEntryDetailId: PropTypes.func.isRequired,
  createEntry: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
};

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
  connect(
    ({ entry: { entryDetailId } }) => ({ selectedId: entryDetailId }),
    (dispatch) => ({
      setEntryDetailId: (entryId) => dispatch(setEntryDetailId(entryId)),
    }),
  ),
)(EntryListContainer);
