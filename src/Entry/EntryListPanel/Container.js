import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import EntryList from './EntryList';
import { setEntryDetailId as _setEntryDetailId } from '../../modules/entry';

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

})(({ entries, isLoadingEntries, setEntryDetailId, createEntry, match }) => {
  if (isLoadingEntries) {
    return <div>Finding entries...</div>;
  }
  if (!entries || entries.length === 0) {
    return <div>No entries</div>;
  }
  return (
    <EntryList
      entries={entries}
      onSelectEntry={setEntryDetailId}
      createEntry={createEntry}
      selectedId={match.params.entryId || ''}
    />
  );
});

EntryListContainer.propTypes = {
  isLoadingEntries: PropTypes.bool,
  entries: PropTypes.arrayOf(PropTypes.object),
  setEntryDetailId: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ entryId: PropTypes.string }).isRequired,
  }).isRequired,
};

EntryListContainer.defaultProps = {
  entries: [],
  isLoadingEntries: false,
}

export default connect(null, (dispatch) => ({
  setEntryDetailId: (entryId) => dispatch(_setEntryDetailId(entryId)),
}))(EntryListContainer);
