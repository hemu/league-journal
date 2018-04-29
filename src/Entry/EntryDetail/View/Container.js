import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { NetworkError } from '../../../Error';
import {
  entryByIdQuery,
  updateEntryMutation,
  deleteEntryMutation,
  entriesByUserQuery,
  filteredEntriesByUserQuery,
} from '../../../api/entry';
import {
  notesQuery,
  updateNoteMutation,
  createNoteMutation,
  deleteNoteMutation,
} from '../../../api/note';
import {
  fetchNotes as fetchNotesApi,
  setEntryDetailId,
} from '../../../modules/entry';
import { SystemNoteTypeIds } from '../../../const';

import EntryDetail from './EntryDetail';

export default compose(
  connect(
    (
      { forms: { entryNote, entry }, entry: { error } },
      { match: { params } },
    ) => ({
      entryId: params ? params.entryId : null,
      error: null,
      videoUrl: entry.video,
    }),
    (dispatch, ownProps) => ({
      fetchNotes: (entryId) => dispatch(fetchNotesApi(entryId)),
      setVideoForm: (videoUrl) =>
        dispatch(actions.change('forms.entry.video', videoUrl)),
      resetSelectedEntry: () => dispatch(setEntryDetailId()),
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
  graphql(updateEntryMutation, {
    props: ({ mutate }) => ({
      updateEntryVideo: (id, gameDate, videoUrl) =>
        mutate({
          variables: {
            id,
            gameDate,
            video: videoUrl,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateEntry: {
              __typename: 'Entry',
              id,
              gameDate,
              video: videoUrl,
              updatedAt: new Date().toISOString(),
            },
          },
        }),
    }),
  }),
  graphql(updateEntryMutation, {
    props: ({ mutate }) => ({
      updateOpponentChamp: (id, gameDate, champ) =>
        mutate({
          variables: {
            id,
            gameDate,
            opponentChampion: champ,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateEntry: {
              __typename: 'Entry',
              id,
              gameDate,
              opponentChampion: champ,
              updatedAt: new Date().toISOString(),
            },
          },
        }),
    }),
  }),
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
  graphql(deleteEntryMutation, {
    props: ({ ownProps: { fetchNotes, userId }, mutate }) => ({
      deleteEntry: (entry) =>
        mutate({
          variables: {
            id: entry.id,
            gameDate: entry.gameDate,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteEntry: true,
          },
          update: (proxy, { data: { deleteEntry } }) => {
            const data = proxy.readQuery({
              query: entriesByUserQuery,
              variables: { user: userId },
            });
            if (data.entriesByUser) {
              data.entriesByUser.entries = data.entriesByUser.entries.filter(
                (queryEntry) => queryEntry.id !== entry.id,
              );
              proxy.writeQuery({
                query: entriesByUserQuery,
                variables: { user: userId },
                data,
              });
            }

            const filteredData = proxy.readQuery({
              query: filteredEntriesByUserQuery,
              variables: { user: userId, champion: entry.champion },
            });
            if (filteredData.entriesByUser) {
              filteredData.entriesByUser.entries = filteredData.entriesByUser.entries.filter(
                (queryEntry) => queryEntry.id !== entry.id,
              );
              proxy.writeQuery({
                query: filteredEntriesByUserQuery,
                variables: { user: userId, champion: entry.champion },
                data: filteredData,
              });
            }
          },
        }),
    }),
  }),
)(EntryDetail);
