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
      marked
      text
      type
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
  mutation UpdateNote($id: ID!, $text: String!) {
    updateNote(id: $id, text: $text) {
      id
      text
    }
  }
`;
