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
} from '../../modules/entry';
import EntryDetail from '../EntryDetail/EntryDetail';
import { formModel } from '../helpers';
import { isLocalId } from '../../helpers';

const EntryDetailContainer = ({
  // id,
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
  <EntryDetailEdit
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
  }),
)(EntryDetailContainer);
