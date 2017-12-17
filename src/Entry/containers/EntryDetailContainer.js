import React from 'react';
// import EntryDetailEdit from "../EntryDetailEdit/EntryDetailEdit";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { saveEntry, removeEntry } from '../../modules/entry';
import EntryDetail from '../EntryDetail/EntryDetail';
import { formModel } from '../helpers';

const EntryDetailContainer = ({
  id,
  // mistakes,
  // positives,
  // lessons,
  // deathReasons,
  // csReasons,
  // roams,
  removeEntry: _removeEntry,
  saveEntry: _saveEntry,
  formChange,
  formAdd,
  formRemove,
  ...rest
}) => (
  // if (detailFormLoadStatus === RequestStatus.Request) {
  //   return <div>Fetching entry details...</div>;
  // }
  //
  // if (detailFormLoadStatus !== RequestStatus.Success) {
  //   return <div>Choose an Entry</div>;
  // }
  <EntryDetail
    {...rest}
    // mistakes={mistakes}
    // positives={positives}
    // lessons={lessons}
    // deathReasons={deathReasons}
    // csReasons={csReasons}
    // roams={roams}
    removeEntry={_removeEntry}
    saveEntry={_saveEntry}
    formChange={formChange}
    formAdd={formAdd}
    formRemove={formRemove}
  />
);

EntryDetailContainer.propTypes = {
  id: PropTypes.string.isRequired,
  removeEntry: PropTypes.func.isRequired,
  saveEntry: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  formAdd: PropTypes.func.isRequired,
  formRemove: PropTypes.func.isRequired,
};

export default connect(
  ({ forms: { entry } }) => ({
    ...entry,
  }),
  dispatch => ({
    removeEntry: entryId => dispatch(removeEntry(entryId)),
    saveEntry: entry => dispatch(saveEntry(entry)),
    formChange: formAction => dispatch(formAction),
    formAdd: model => dispatch(actions.push(formModel(model), '')),
    formRemove: (model, index) =>
      dispatch(actions.remove(formModel(model), index)),
  }),
)(EntryDetailContainer);
