import gql from 'graphql-tag';

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
      meta
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
    $meta: [String]
  ) {
    createNote(
      entry: $entry
      user: $user
      marked: $marked
      text: $text
      type: $type
      meta: $meta
    ) {
      id
      text
      type
      createdAt
      updatedAt
      marked
      meta
    }
  }
`;

export const deleteNoteMutation = gql`
  mutation DeleteNote($id: ID!, $entry: ID!) {
    deleteNote(id: $id, entry: $entry) {
      id
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
