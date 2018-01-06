import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { actions } from 'react-redux-form';
import {
  entryDetailQuery,
  markMistakeMutation,
  markLessonMutation,
} from '../../api/entry';

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

// export default connect(
//   ({ forms: { entry }, entry: { editMode } }) => ({
//     ...entry,
//     editMode,
//   }),
//   dispatch => ({
//     removeEntry: (entryId, mistakes, lessons) =>
//       dispatch(removeEntry(entryId, mistakes, lessons)),
//     saveEntry: entry => dispatch(saveEntry(entry)),
//     formChange: formAction => dispatch(formAction),
//     formAddString: model => dispatch(actions.push(formModel(model), '')),
//     formAdd: model =>
//       dispatch(actions.push(formModel(model), { id: LOCAL_ID_PREFIX, text: '' })),
//     formRemove: (model, index) =>
//       dispatch(actions.remove(formModel(model), index)),
//     updateMistake,
//     updateLesson,
//     removeMistake: (id, index) => {
//       dispatch(actions.remove(formModel('.mistakes'), index));
//       if (!isLocalId(id)) {
//         dispatch(removeMistake(id));
//       }
//     },
//     removeLesson: (id, index) => {
//       dispatch(actions.remove(formModel('.lessons'), index));
//       if (!isLocalId(id)) {
//         dispatch(removeLesson(id));
//       }
//     },
//     setEditMode: isEditMode => dispatch(setEditMode(isEditMode)),
//   }),
// )(EntryDetailContainer);

export default compose(
  graphql(entryDetailQuery, {
    skip: (ownProps) => {
      console.log(ownProps);
      console.log(`am skipping ${!ownProps.entryDetailId}`);
      return !ownProps.entryDetailId;
    },
    options: ({ entryDetailId }) => ({ variables: { entryId: entryDetailId } }),
  }),
  graphql(markMistakeMutation, {
    props: ({ mutate }) => ({
      markMistake: (id, marked) =>
        mutate({
          variables: { id, marked },
          optimisticResponse: {
            __typename: 'Mutation',
            updateMistake: {
              __typename: 'Mistake',
              id,
              marked,
            },
          },
        }),
    }),
  }),
  graphql(markLessonMutation, {
    props: ({ mutate }) => ({
      markLesson: (id, marked) =>
        mutate({
          variables: { id, marked },
          optimisticResponse: {
            __typename: 'Mutation',
            updateLesson: {
              __typename: 'Lesson',
              id,
              marked,
            },
          },
        }),
    }),
  }),
)(EntryDetail);
