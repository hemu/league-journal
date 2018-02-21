import gql from 'graphql-tag';
// import client from '../api/client';

export const latestNotesQuery = gql`
  query LatestNotesQuery {
    allMistakes(orderBy: createdAt_DESC, first: 10) {
      id
      text
      entry {
        champion
        opponentChampion
        gameDate
      }
      marked
      createdAt
    }
    allLessons(orderBy: createdAt_DESC, first: 10) {
      id
      text
      entry {
        champion
        opponentChampion
        gameDate
      }
      marked
      createdAt
    }
  }
`;

export const notesQuery = gql`
  query NotesQuery($entry: String!) {
    notesByEntry(entry: $entry) {
      id
      createdAt
      updatedAt
      marked
      text
      type
    }
  }
`;

export const createNoteMutation = gql`
  mutation CreateNote(
    $entry: ID!
    $user: ID!
    $marked: Boolean!
    $text: String!
    $type: String!
  ) {
    createNote(
      entry: $entry
      user: $user
      marked: $marked
      text: $text
      type: $type
    ) {
      id
      text
      type
      createdAt
      updatedAt
      marked
    }
  }
`;

export const markNoteMutation = gql`
  mutation MarkNote($id: ID!, $entry: ID!, $marked: Boolean!) {
    markNote(id: $id, entry: $entry, marked: $marked) {
      id
      marked
    }
  }
`;

export const updateNoteMutation = gql`
  mutation UpdateNote($id: ID!, $entry: ID!, $text: String!) {
    updateNoteText(id: $id, entry: $entry, text: $text) {
      id
      text
    }
  }
`;

// export function createNote(entry, user, marked, text, type) {
//   return client.mutate({
//     mutation: createNoteMutation,
//     variables: {
//       entry,
//       user,
//       marked,
//       text: text || ' ',
//       type,
//     },
//     optimisticResponse: {
//       __typename: 'Mutation',
//       createNote: {
//         __typename: 'Note',
//         id: Math.round(Math.random() * -1000000).toString(),
//         text: text || ' ',
//         type,
//         marked,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     },
//     update: (proxy, { data: { createNote } }) => {
//       // Read the data from our cache for this query.
//       const data = proxy.readQuery({
//         query: notesQuery,
//         variables: {
//           entry,
//         },
//       });
//       console.log('--------------------');
//       console.log(data);
//       // Add our comment from the mutation to the end.
//       data.notesByEntry.push(createNote);
//       // Write our data back to the cache.
//       console.log(createNote);
//       console.log('*************');
//       console.log(data);
//       proxy.writeQuery({
//         query: notesQuery,
//         variables: {
//           entry,
//         },
//         data,
//       });
//     },
//   });
// }
