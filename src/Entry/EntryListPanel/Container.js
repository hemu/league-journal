import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import EntryList from './EntryList';
import { setEntryDetailId as _setEntryDetailId } from '../../modules/entry';

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
    if (
      !this.props.isLoadingEntries &&
      (!this.props.match ||
        !this.props.match.params ||
        !this.props.match.params.entryId)
    ) {
      const { entries, setEntryDetailId } = this.props;
      if (entries && entries.length > 0) {
        setEntryDetailId(entries[0].id);
      }
    }
  },

  componentWillReceiveProps(nextProps) {
    // if going from loading to done loading,
    // and no current selectedId, set default detail entry to first entry
    if (!nextProps.isLoadingEntries && !nextProps.match.params.entryId) {
      const { entries, setEntryDetailId } = nextProps;
      if (entries && entries.length > 0) {
        setEntryDetailId(entries[0].id);
      }
    }
  },
})((props) => {
  const {
    entries,
    setEntryDetailId,
    createEntry,
    match,
    canLoadMore,
  } = props;
  // fetchMoreEntries,
  if (!entries || entries.length === 0) {
    return <div />;
  }
  return (
    <EntryList
      entries={entries}
      onSelectEntry={setEntryDetailId}
      createEntry={createEntry}
      selectedId={match.params.entryId || ''}
      fetchMoreEntries={() => fetchMoreEntries(props)}
      canLoadMore={canLoadMore}
    />
  );
});

EntryListContainer.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
  setEntryDetailId: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ entryId: PropTypes.string }).isRequired,
  }).isRequired,
  fetchMoreQuery: PropTypes.func.isRequired,
  lastEvaluatedKey: PropTypes.shape({}).isRequired,
  canLoadMore: PropTypes.bool.isRequired,
};

EntryListContainer.defaultProps = {
  entries: [],
};

export default connect(null, (dispatch, ownProps) => ({
  setEntryDetailId: (entryId) => dispatch(_setEntryDetailId(entryId)),
}))(EntryListContainer);
