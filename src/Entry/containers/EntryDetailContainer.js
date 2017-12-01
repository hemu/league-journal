import React from "react";
import EntryDetail from "../components/EntryDetail";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { saveEntry, removeEntry } from "../../modules/entry";
import { RequestStatus } from "../../const";
import { formModel } from "../helpers";

class EntryDetailContainer extends React.Component {
  render() {
    const {
      id,
      mistakes,
      positives,
      lessons,
      deathReasons,
      csReasons,
      roams,
      removeEntry,
      saveEntry,
      formChange,
      formAdd
    } = this.props;

    // if (detailFormLoadStatus === RequestStatus.Request) {
    //   return <div>Fetching entry details...</div>;
    // }
    //
    // if (detailFormLoadStatus !== RequestStatus.Success) {
    //   return <div>Choose an Entry</div>;
    // }
    return (
      <EntryDetail
        entryId={id}
        mistakes={mistakes}
        positives={positives}
        lessons={lessons}
        deathReasons={deathReasons}
        csReasons={csReasons}
        roams={roams}
        removeEntry={removeEntry}
        saveEntry={saveEntry}
        formChange={formChange}
        formAdd={formAdd}
      />
    );
  }
}

export default connect(
  ({
    forms: {
      entry: {
        id,
        mistakes,
        positives,
        lessons,
        deathReasons,
        csReasons,
        roams
      }
    }
  }) => ({
    id,
    mistakes,
    positives,
    lessons,
    deathReasons,
    csReasons,
    roams
  }),
  dispatch => ({
    removeEntry: entryId => dispatch(removeEntry(entryId)),
    saveEntry: entry => dispatch(saveEntry(entry)),
    formChange: formAction => dispatch(formAction),
    formAdd: model => dispatch(actions.push(formModel(model), ""))
  })
)(EntryDetailContainer);
