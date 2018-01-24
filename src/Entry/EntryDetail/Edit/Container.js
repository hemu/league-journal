import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { actions } from 'react-redux-form';
import { entryDetailQuery } from '../../../api/entry';
import { deleteMistakeMutation } from '../../../api/mistake';
import { deleteLessonMutation } from '../../../api/lesson';

import EntryDetailEdit from './EntryDetailEdit';
import { LOCAL_ID_PREFIX } from '../../../const';
import {
  saveEntry,
  removeEntry,
  updateMistake,
  updateLesson,
  setEditMode,
} from '../../../modules/entry';
import { formModel } from '../../helpers';

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
            data.Entry.mistakes = data.Entry.mistakes.filter(
              (mistake) => mistake.id !== removedId,
            );
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
            data.Entry.lessons = data.Entry.lessons.filter(
              (lesson) => lesson.id !== removedId,
            );
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
    (dispatch) => ({
      removeEntry: (entryId, mistakes, lessons) =>
        dispatch(removeEntry(entryId, mistakes, lessons)),
      saveEntry: (entry) => dispatch(saveEntry(entry)),
      formChange: (formAction) => dispatch(formAction),
      formAdd: (model) => {
        const formPush = actions.push(formModel(model), {
          id: LOCAL_ID_PREFIX,
          text: '',
          isLatest: true,
        });
        return dispatch(formPush);
      },
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
      setEditMode: (isEditMode) => dispatch(setEditMode(isEditMode)),
    }),
  ),
)(EntryDetailEdit);
