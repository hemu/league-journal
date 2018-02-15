import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { entryByIdQuery } from '../../../api/entry';
import { notesQuery, markNoteMutation } from '../../../api/note';
import { setEditMode } from '../../../modules/entry';
import { SystemNoteTypeIds } from '../../../const';

import EntryDetail from './EntryDetail';

export default compose(
  graphql(entryByIdQuery, {
    skip: (ownProps) => !ownProps.match.params.entryId,
    options: ({ match }) => ({
      variables: {
        id: match.params.entryId,
      },
    }),
    props: ({ entryByIdQuery: query }) => ({
      entry: query.entryById,
      entryLoading: query.loading,
    }),
    name: 'entryByIdQuery',
  }),
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
  graphql(markNoteMutation, {
    props: ({ mutate }) => ({
      markNote: (id, entry, marked) =>
        mutate({
          variables: {
            id,
            entry,
            marked,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            markNote: {
              __typename: 'Note',
              id,
              entry,
              marked,
            },
          },
        }),
    }),
  }),
  // graphql(markLessonMutation, {
  //   props: ({ mutate }) => ({
  //     markLesson: (id, marked) =>
  //       mutate({
  //         variables: {
  //           id,
  //           marked,
  //         },
  //         optimisticResponse: {
  //           __typename: 'Mutation',
  //           updateLesson: {
  //             __typename: 'Lesson',
  //             id,
  //             marked,
  //           },
  //         },
  //       }),
  //   }),
  // }),
  connect(null, (dispatch, ownProps) => ({
    setEditMode: (isEditMode, entryId) =>
      dispatch(setEditMode(isEditMode, entryId, ownProps.location.pathname)),
    // ownProps.history.push(`${ownProps.history.location.pathname}/edit`);
  })),
)(EntryDetail);
