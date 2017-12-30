import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import EntryDetailEdit from '../EntryDetailEdit/EntryDetailEdit';
import { LOCAL_ID_PREFIX } from '../../const';
import {
  saveEntry,
  removeEntry,
  updateMistake,
  updateLesson,
  removeMistake,
  removeLesson,
  setEditMode,
} from '../../modules/entry';
import EntryDetail from '../EntryDetail/EntryDetail';
import { formModel } from '../helpers';
import { isLocalId } from '../../helpers';

// const EntryDetailContainer = ({
// id,
// mistakes,
// positives,
// lessons,
// deathReasons,
// csReasons,
// roams,
// removeEntry: _removeEntry,
// saveEntry: _saveEntry,
// formChange,
// formAdd,
// formRemove,
// ...rest
// }) => (
const EntryDetailContainer = props =>
  // if (detailFormLoadStatus === RequestStatus.Request) {
  //   return <div>Fetching entry details...</div>;
  // }
  //
  // if (detailFormLoadStatus !== RequestStatus.Success) {
  //   return <div>Choose an Entry</div>;
  // }
  (props.editMode ? (
    <EntryDetailEdit
      // {...rest}
      // removeEntry={_removeEntry}
      // saveEntry={_saveEntry}
      // formChange={formChange}
      // formAdd={formAdd}
      // formRemove={formRemove}
      {...props}
    />
  ) : (
    <EntryDetail
      // id={id}
      // mistakes={mistakes}
      // lessons={lessons}
      // positives={positives}
      // deathReasons={deathReasons}
      // csReasons={csReasons}
      // roams={roams}
      {...props}
    />
  ));

EntryDetailContainer.propTypes = {
  id: PropTypes.string.isRequired,
  removeEntry: PropTypes.func.isRequired,
  saveEntry: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  formAdd: PropTypes.func.isRequired,
  formRemove: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default connect(
  ({ forms: { entry }, entry: { editMode } }) => ({
    ...entry,
    editMode,
  }),
  dispatch => ({
    removeEntry: (entryId, mistakes, lessons) =>
      dispatch(removeEntry(entryId, mistakes, lessons)),
    saveEntry: entry => dispatch(saveEntry(entry)),
    formChange: formAction => dispatch(formAction),
    formAddString: model => dispatch(actions.push(formModel(model), '')),
    formAdd: model =>
      dispatch(actions.push(formModel(model), { id: LOCAL_ID_PREFIX, text: '' })),
    formRemove: (model, index) =>
      dispatch(actions.remove(formModel(model), index)),
    updateMistake,
    updateLesson,
    removeMistake: (id, index) => {
      dispatch(actions.remove(formModel('.mistakes'), index));
      if (!isLocalId(id)) {
        dispatch(removeMistake(id));
      }
    },
    removeLesson: (id, index) => {
      dispatch(actions.remove(formModel('.lessons'), index));
      if (!isLocalId(id)) {
        dispatch(removeLesson(id));
      }
    },
    setEditMode: isEditMode => dispatch(setEditMode(isEditMode)),
  }),
)(EntryDetailContainer);
