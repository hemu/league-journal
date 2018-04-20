import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import { graphql, compose } from 'react-apollo';
import EntryList from './EntryList';
import {
  setEntryDetailId as _setEntryDetailId,
  setChampFilter as _setChampFilter,
} from '../../modules/entry';
import { filteredEntriesByUserQuery } from '../../api/entry';

function fetchMoreEntries(props) {
  const { userId, lastEvaluatedKey, fetchMoreQuery } = props;
  fetchMoreQuery({
    variables: {
      user: userId,
      lastEvaluatedGameDate: lastEvaluatedKey.gameDate,
      lastEvaluatedID: lastEvaluatedKey.id,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => ({
      entriesByUser: {
        entries: [
          ...previousResult.entriesByUser.entries,
          ...fetchMoreResult.entriesByUser.entries,
        ],
        lastEvaluatedKey: fetchMoreResult.entriesByUser.lastEvaluatedKey,
      },
    }),
  });
}

export const EntryListContainer = lifecycle({
  componentDidMount() {
    const loading = !this.props.data || this.props.data.loading;

    if (
      (!loading && !this.props.match) ||
      !this.props.match.params ||
      !this.props.match.params.entryId
    ) {
      const { unfilteredEntries, setEntryDetailId } = this.props;
      if (unfilteredEntries && unfilteredEntries.length > 0) {
        setEntryDetailId(unfilteredEntries[0].id);
      }
    }
  },

  componentWillReceiveProps(nextProps) {
    const loading = nextProps.data && nextProps.data.loading;
    // if going from loading to done loading,
    // and no current selectedId, set default detail entry to first entry
    if (nextProps.champFilter !== this.props.champFilter && this.props.data) {
      this.props.data.refetch();
    }

    if (!loading && !nextProps.match.params.entryId) {
      const { unfilteredEntries, setEntryDetailId } = nextProps;
      if (unfilteredEntries && unfilteredEntries.length > 0) {
        setEntryDetailId(unfilteredEntries[0].id);
      }
    }
  },
})((props) => {
  const {
    unfilteredEntries,
    setEntryDetailId,
    createEntry,
    match,
    canLoadMore,
    setChampFilter,
    champFilter,
    data,
  } = props;

  if ((!unfilteredEntries || unfilteredEntries.length === 0) && !champFilter) {
    return <div />;
  }

  let entries = unfilteredEntries;

  if (champFilter) {
    entries = data.entriesByUser ? data.entriesByUser.entries : [];
  }

  return (
    <EntryList
      entries={entries}
      onSelectEntry={setEntryDetailId}
      createEntry={createEntry}
      selectedId={match.params.entryId || ''}
      fetchMoreEntries={() => fetchMoreEntries(props)}
      canLoadMore={canLoadMore}
      setChampFilter={setChampFilter}
      champFilter={champFilter}
      loading={data && data.loading}
    />
  );
});

EntryListContainer.propTypes = {
  unfilteredEntries: PropTypes.arrayOf(PropTypes.object),
  setEntryDetailId: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ entryId: PropTypes.string }).isRequired,
  }).isRequired,
  fetchMoreQuery: PropTypes.func.isRequired,
  lastEvaluatedKey: PropTypes.shape({}).isRequired,
  canLoadMore: PropTypes.bool.isRequired,
  setChampFilter: PropTypes.func.isRequired,
  champFilter: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
};

EntryListContainer.defaultProps = {
  entries: [],
};

export default compose(
  connect(
    ({ auth, entry }) => ({
      champFilter: entry.champFilter,
    }),
    (dispatch, ownProps) => ({
      setEntryDetailId: (entryId) => dispatch(_setEntryDetailId(entryId)),
      setChampFilter: (champ) => dispatch(_setChampFilter(champ)),
    }),
  ),
  graphql(filteredEntriesByUserQuery, {
    skip: (ownProps) =>
      !ownProps.userId || ownProps.userId === '' || ownProps.champFilter === '',
    options: (props) => ({
      variables: {
        user: props.userId,
        champion: props.champFilter,
      },
      notifyOnNetworkStatusChange: true,
    }),
  }),
)(EntryListContainer);
