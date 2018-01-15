import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { actions } from 'react-redux-form';
import gql from 'graphql-tag';
import {
  entryDetailQuery,
  // markMistakeMutation,
  // markLessonMutation,
  deleteMistakeMutation,
  deleteLessonMutation,
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
import { formModel } from '../helpers';
import { isLocalId } from '../../helpers';

export default compose(
  graphql(deleteMistakeMutation, {
    props: ({ mutate }) => ({
      removeMistake: (id, index, entryId) =>
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteMistake: {
              __typename: 'Mistake',
              id,
            },
          },
          update: (proxy, { data: { deleteMistake: { id: removedId } } }) => {
            // Read the data from our cache for this query.
            const data = proxy.readQuery({
              query: entryDetailQuery,
              variables: { entryId },
            });
            // Add our comment from the mutation to the end.
            data.Entry.mistakes = data.Entry.mistakes.filter(mistake => mistake.id !== removedId);
            // Write our data back to the cache.
            proxy.writeQuery({
              query: entryDetailQuery,
              variables: { entryId },
              data,
            });
          },
        }),
    }),
  }),
  graphql(deleteLessonMutation, {
    props: ({ mutate }) => ({
      removeLesson: (id, index, entryId) =>
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteLesson: {
              __typename: 'Lesson',
              id,
            },
          },
          update: (proxy, { data: { deleteLesson: { id: removedId } } }) => {
            // Read the data from our cache for this query.
            const data = proxy.readQuery({
              query: entryDetailQuery,
              variables: { entryId },
            });
            // Add our comment from the mutation to the end.
            data.Entry.lessons = data.Entry.lessons.filter(lesson => lesson.id !== removedId);
            // Write our data back to the cache.
            proxy.writeQuery({
              query: entryDetailQuery,
              variables: { entryId },
              data,
            });
          },
        }),
    }),
  }),

  connect(
    ({ forms: { entry }, entry: { editMode } }) => ({
      ...entry,
      editMode,
    }),
    dispatch => ({
      removeEntry: (entryId, mistakes, lessons) =>
        dispatch(removeEntry(entryId, mistakes, lessons)),
      saveEntry: entry => dispatch(saveEntry(entry)),
      formChange: formAction => dispatch(formAction),
      formAdd: model =>
        dispatch(actions.push(formModel(model), {
          id: LOCAL_ID_PREFIX,
          text: '',
          isLatest: true,
        })),
      formRemove: (model, index) =>
        dispatch(actions.remove(formModel(model), index)),
      updateMistake,
      updateLesson,
      removeMistakeLocal: (id, index) => {
        dispatch(actions.remove(formModel('.mistakes'), index));
      },
      removeLessonLocal: (id, index) => {
        dispatch(actions.remove(formModel('.lessons'), index));
      },
      setEditMode: isEditMode => dispatch(setEditMode(isEditMode)),
    }),
  ),
)(EntryDetailEdit);

// export default compose(
//   graphql(entryDetailQuery, {
//     skip: (ownProps) => {
//       console.log(ownProps);
//       console.log(`am skipping ${!ownProps.entryDetailId}`);
//       return !ownProps.entryDetailId;
//     },
//     options: ({ entryDetailId }) => ({ variables: { entryId: entryDetailId } }),
//   }),
//   graphql(markMistakeMutation, {
//     props: ({ mutate }) => ({
//       markMistake: (id, marked) =>
//         mutate({
//           variables: { id, marked },
//           optimisticResponse: {
//             __typename: 'Mutation',
//             updateMistake: {
//               __typename: 'Mistake',
//               id,
//               marked,
//             },
//           },
//         }),
//     }),
//   }),
//   graphql(markLessonMutation, {
//     props: ({ mutate }) => ({
//       markLesson: (id, marked) =>
//         mutate({
//           variables: { id, marked },
//           optimisticResponse: {
//             __typename: 'Mutation',
//             updateLesson: {
//               __typename: 'Lesson',
//               id,
//               marked,
//             },
//           },
//         }),
//     }),
//   }),
// )(EntryDetailEdit);
