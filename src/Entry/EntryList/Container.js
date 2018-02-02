import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { lifecycle } from 'recompose';
import EntryList from './EntryList';
import { setEntryDetailId as _setEntryDetailId } from '../../modules/entry';
import { entryFormInitialState } from '../../modules/entryForm';
import { allEntriesQuery, createEntryMutation } from '../../api/entry';

const EntryListContainer = lifecycle({
  componentDidMount() {
    console.log('comp did mount');
    console.log(this.props);
    if (!this.props.data.loading && !this.props.match.params.entryId) {
      const { data: { allEntries }, setEntryDetailId } = this.props;
      if (allEntries && allEntries.length > 0) {
        setEntryDetailId(allEntries[0].id);
        console.log('seting entry detail id from did mount()');
      }
    }
  },
  componentWillReceiveProps(nextProps) {
    // if going from loading to done loading,
    // and no current selectedId, set default detail entry to first entry
    if (
      this.props.data.loading &&
      !nextProps.data.loading &&
      !nextProps.match.params.entryId
    ) {
      const { data: { allEntries }, setEntryDetailId } = nextProps;
      if (allEntries && allEntries.length > 0) {
        setEntryDetailId(allEntries[0].id);
        console.log('seting entry detail id from will receive props');
      }
    }
  },
})(
  ({ data: { loading, allEntries }, setEntryDetailId, createEntry, match }) => {
    if (loading) {
      return <div>Finding entries...</div>;
    }

    if (!allEntries) {
      return <div>No entries</div>;
    }

    return (
      <EntryList
        entries={allEntries}
        onSelectEntry={setEntryDetailId}
        createEntry={createEntry}
        selectedId={match.params.entryId || ''}
      />
    );
  },
);

EntryListContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  setEntryDetailId: PropTypes.func.isRequired,
  createEntry: PropTypes.func.isRequired,
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
  connect(null, (dispatch) => ({
    setEntryDetailId: (entryId) => dispatch(_setEntryDetailId(entryId)),
  })),
)(EntryListContainer);
