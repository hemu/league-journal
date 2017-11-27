import React from "react";
import EntryDetail from "../components/EntryDetail";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { saveEntry } from "../../modules/entry";
import { RequestStatus } from "../../const";
import { formModel } from "../helpers";

class EntryDetailContainer extends React.Component {
  render() {
    const {
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
      entry: { mistakes, positives, lessons, deathReasons, csReasons, roams }
    }
  }) => ({
    mistakes,
    positives,
    lessons,
    deathReasons,
    csReasons,
    roams
  }),
  dispatch => ({
    removeEntry: () => console.log("remove Entry"),
    saveEntry: entry => dispatch(saveEntry(entry)),
    formChange: formAction => dispatch(formAction),
    formAdd: model => dispatch(actions.push(formModel(model), ""))
  })
)(EntryDetailContainer);
