import gql from 'graphql-tag';

export const markedMistakesQuery = gql`
  query MarkedMistakesQuery {
    allMistakes(filter: { marked: true }, first: 10, orderBy: createdAt_DESC) {
      id
      text
      marked
      entry {
        champion
        opponentChampion
      }
    }
  }
`;

export const markMistakeMutation = gql`
  mutation UpdateMistake($id: ID!, $marked: Boolean!) {
    updateMistake(id: $id, marked: $marked) {
      id
      marked
    }
  }
`;

export const updateMistakeMutation = gql`
  mutation UpdateMistake($id: ID!, $text: String!) {
    updateMistake(id: $id, text: $text) {
      id
      text
    }
  }
`;

export const deleteMistakeMutation = gql`
  mutation DeleteMistake($id: ID!) {
    deleteMistake(id: $id) {
      id
    }
  }
`;
