import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EntryList from '../components/EntryList';
import { RequestStatus } from '../../const';
import { fetchAllEntries, setEntryDetail, addEntry } from '../../modules/entry';

class EntryListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const {
      entries,
      fetchAllStatus,
      setEntryDetail: _setEntryDetail,
      addEntry: _addEntry,
    } = this.props;
    if (!entries) {
      return <div>No entries</div>;
    }

    if (fetchAllStatus !== RequestStatus.Success) {
      return <div>Finding entries...</div>;
    }

    return (
      <EntryList
        entries={entries}
        onSelectEntry={_setEntryDetail}
        addEntry={_addEntry}
      />
    );
  }
}

EntryListContainer.propTypes = {
  fetchAll: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllStatus: PropTypes.string.isRequired,
  setEntryDetail: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
};

export default connect(
  ({ entry }) => ({
    entries: entry.entries,
    fetchAllStatus: entry.fetchAllStatus,
  }),
  dispatch => ({
    fetchAll: () => dispatch(fetchAllEntries()),
    setEntryDetail: (entryIndex, entryId) =>
      dispatch(setEntryDetail(entryIndex, entryId)),
    addEntry: () => dispatch(addEntry()),
  }),
)(EntryListContainer);
