import React from "react";
import { connect } from "react-redux";
import EntryList from "../components/EntryList";
import { RequestStatus } from "../../const";
import { fetchAllEntries, setEntryDetail } from "../../modules/entry";

class EntryListContainer extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchAll();
  }

  render() {
    const { entries, fetchAllStatus, setEntryDetail } = this.props;
    if (!entries) {
      return <div>No entries</div>;
    }

    if (fetchAllStatus !== RequestStatus.Success) {
      return <div>Finding entries...</div>;
    }

    return <EntryList entries={entries} onSelectEntry={setEntryDetail} />;
  }
}

export default connect(
  ({ entry }) => ({
    entries: entry.entries,
    fetchAllStatus: entry.fetchAllStatus
  }),
  dispatch => ({
    fetchAll: () => dispatch(fetchAllEntries()),
    setEntryDetail: entryIndex => dispatch(setEntryDetail(entryIndex))
  })
)(EntryListContainer);
