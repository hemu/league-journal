import React from "react";
import EntryDetail from "../components/EntryDetail";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { RequestStatus } from "../../const";
import { formModel } from "../helpers";

class EntryDetailContainer extends React.Component {
  render() {
    const {
      entry,
      removeEntry,
      saveEntry,
      fetchEntryStatus,
      formChange,
      formAdd
    } = this.props;

    if (fetchEntryStatus === RequestStatus.Request) {
      return <div>Fetching entry details...</div>;
    }

    if (fetchEntryStatus !== RequestStatus.Success) {
      return <div>Choose an Entry</div>;
    }

    return (
      <EntryDetail
        entry={entry}
        removeEntry={removeEntry}
        saveEntry={saveEntry}
        formChange={formChange}
        formAdd={formAdd}
      />
    );
  }
}

export default connect(
  ({ entry, forms: { entry: entryForm } }) => ({
    entry: entryForm,
    fetchEntryStatus: entry.fetchEntryStatus
  }),
  dispatch => ({
    removeEntry: () => console.log("remove Entry"),
    saveEntry: entryIndex => console.log("save entry"),
    formChange: formAction => dispatch(formAction),
    formAdd: model => dispatch(actions.push(formModel(model), ""))
  })
)(EntryDetailContainer);
