import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import EntryList from './EntryList';
import { setEntryDetailId as _setEntryDetailId } from '../../modules/entry';

const EntryListContainer = lifecycle({
  componentDidMount() {
    if (!this.props.isLoadingEntries && !this.props.match.params.entryId) {
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
  isLoadingEntries: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEntryDetailId: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(null, (dispatch) => ({
  setEntryDetailId: (entryId) => dispatch(_setEntryDetailId(entryId)),
}))(EntryListContainer);
