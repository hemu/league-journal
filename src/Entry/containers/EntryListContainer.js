import React from "react";
import { connect } from "react-redux";
import EntryList from "../components/EntryList";
import { RequestStatus } from "../../const";
import { fetchAllEntries, setEntryDetail, addEntry } from "../../modules/entry";

class EntryListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const { entries, fetchAllStatus, setEntryDetail, addEntry } = this.props;
    if (!entries) {
      return <div>No entries</div>;
    }

    if (fetchAllStatus !== RequestStatus.Success) {
      return <div>Finding entries...</div>;
    }

    return (
      <EntryList
        entries={entries}
        onSelectEntry={setEntryDetail}
        addEntry={addEntry}
      />
    );
  }
}

export default connect(
  ({ entry }) => ({
    entries: entry.entries,
    fetchAllStatus: entry.fetchAllStatus
  }),
  dispatch => ({
    fetchAll: () => dispatch(fetchAllEntries()),
    setEntryDetail: (entryIndex, entryId) =>
      dispatch(setEntryDetail(entryIndex, entryId)),
    addEntry: () => dispatch(addEntry())
  })
)(EntryListContainer);
