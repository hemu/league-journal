import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { actions } from 'react-redux-form';
import { entryByIdQuery } from '../../../api/entry';
import { notesQuery, markNoteMutation } from '../../../api/note';
import { deleteMistakeMutation } from '../../../api/mistake';
import { deleteLessonMutation } from '../../../api/lesson';

import EntryDetailEdit from './EntryDetailEdit';
import { LOCAL_ID_PREFIX, SystemNoteTypeIds } from '../../../const';
import {
  saveEntry,
  removeEntry,
  updateMistake,
  updateLesson,
  setEditMode,
} from '../../../modules/entry';
import { formModel } from '../../helpers';

export default compose(
  graphql(notesQuery, {
    skip: (ownProps) => !ownProps.match.params.entryId,
    options: ({ match }) => ({
      variables: {
        entry: match.params.entryId,
      },
    }),
    props: ({ notesQuery: query }) => ({
      mistakes: query.notesByEntry
        ? query.notesByEntry.filter(
          (note) => note.type === SystemNoteTypeIds.Mistake,
        )
        : [],
      lessons: query.notesByEntry
        ? query.notesByEntry.filter(
          (note) => note.type === SystemNoteTypeIds.Lesson,
        )
        : [],
      notesLoading: query.loading,
    }),
    name: 'notesQuery',
  }),
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
              query: entryByIdQuery,
              variables: { id: entryId },
            });
            // Add our comment from the mutation to the end.
            data.entryById.mistakes = data.entryById.mistakes.filter(
              (mistake) => mistake.id !== removedId,
            );
            // Write our data back to the cache.
            proxy.writeQuery({
              query: entryByIdQuery,
              variables: { id: entryId },
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
              query: entryByIdQuery,
              variables: { id: entryId },
            });
            // Add our comment from the mutation to the end.
            data.entryById.lessons = data.entryById.lessons.filter(
              (lesson) => lesson.id !== removedId,
            );
            // Write our data back to the cache.
            proxy.writeQuery({
              query: entryByIdQuery,
              variables: { id: entryId },
              data,
            });
          },
        }),
    }),
  }),

  connect(
    ({ forms: { entry } }) => ({
      ...entry,
    }),
    (dispatch, ownProps) => ({
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
      removeEntry: (entryId, mistakes, lessons) =>
        dispatch(removeEntry(entryId, mistakes, lessons)),
      saveEntry: (entry) => dispatch(saveEntry(entry)),
      removeMistakeLocal: (id, index) => {
        dispatch(actions.remove(formModel('.mistakes'), index));
      },
      removeLessonLocal: (id, index) => {
        dispatch(actions.remove(formModel('.lessons'), index));
      },
      setEditMode: (isEditMode) => {
        dispatch(
          setEditMode(isEditMode, null, ownProps.history.location.pathname),
        );
      },
    }),
  ),
)(EntryDetailEdit);
