import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { NetworkError } from '../../../Error';

import { entryByIdQuery } from '../../../api/entry';
import {
  notesQuery,
  updateNoteMutation,
  markNoteMutation,
  createNoteMutation,
  deleteNoteMutation,
} from '../../../api/note';
import { fetchNotes as fetchNotesApi } from '../../../modules/entry';
import { SystemNoteTypeIds } from '../../../const';

import EntryDetail from './EntryDetail';

export default compose(
  connect(
    ({ forms: { entryNote }, entry: { error } }, { match: { params } }) => ({
      entryId: params ? params.entryId : null,
      error: null,
    }),
    (dispatch, ownProps) => ({
      fetchNotes: (entryId) => dispatch(fetchNotesApi(entryId)),
    }),
  ),
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
    props: ({ notesQuery: query }) => {
      const notes = query.notesByEntry ? query.notesByEntry : [];
      return {
        mistakes: notes.filter(
          (note) => note.type === SystemNoteTypeIds.Mistake,
        ),
        lessons: notes.filter((note) => note.type === SystemNoteTypeIds.Lesson),
        notesLoading: query.loading,
      };
    },
    name: 'notesQuery',
  }),
  // graphql(markNoteMutation, {
  //   props: ({ mutate }) => ({
  //     markNote: (id, entry, marked) =>
  //       mutate({
  //         variables: {
  //           id,
  //           entry,
  //           marked,
  //         },
  //         optimisticResponse: {
  //           __typename: 'Mutation',
  //           markNote: {
  //             __typename: 'Note',
  //             id,
  //             entry,
  //             marked,
  //           },
  //         },
  //       }),
  //   }),
  // }),
  graphql(updateNoteMutation, {
    props: ({ mutate }) => ({
      updateNoteText: (id, entry, text) =>
        mutate({
          variables: {
            id,
            entry,
            text: text || ' ',
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateNoteText: {
              __typename: 'Note',
              id,
              text,
            },
          },
        }),
    }),
  }),
  graphql(createNoteMutation, {
    props: ({ ownProps: { fetchNotes }, mutate }) => ({
      createNote: (entry, user, marked, text, type) =>
        mutate({
          variables: {
            entry,
            user,
            marked,
            text: text || ' ',
            type,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createNote: {
              __typename: 'Note',
              id: Math.round(Math.random() * -1000000).toString(),
              text: text || ' ',
              type,
              marked,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          },
          update: (proxy, updateState) => {
            const { data: { createNote } } = updateState;
            const data = proxy.readQuery({
              query: notesQuery,
              variables: {
                entry,
              },
            });
            data.notesByEntry.push(createNote);
            proxy.writeQuery({
              query: notesQuery,
              variables: {
                entry,
              },
              data,
            });
            fetchNotes(entry);
          },
        }),
    }),
  }),
  graphql(deleteNoteMutation, {
    props: ({ ownProps: { fetchNotes }, mutate }) => ({
      deleteNote: (id, entry) =>
        mutate({
          variables: {
            id,
            entry,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteNote: {
              __typename: 'Note',
              id,
            },
          },
          update: (proxy, updateState) => {
            const { data: { deleteNote } } = updateState;
            const data = proxy.readQuery({
              query: notesQuery,
              variables: {
                entry,
              },
            });
            data.notesByEntry = data.notesByEntry.filter(
              (note) => note.id !== deleteNote.id,
            );
            proxy.writeQuery({
              query: notesQuery,
              variables: {
                entry,
              },
              data,
            });
            fetchNotes(entry);
          },
        }),
    }),
  }),
)(EntryDetail);
