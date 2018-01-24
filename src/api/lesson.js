import gql from 'graphql-tag';

export const markedLessonsQuery = gql`
  query MarkedLessonsQuery {
    allLessons(filter: { marked: true }) {
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

export const markLessonMutation = gql`
  mutation UpdateLesson($id: ID!, $marked: Boolean!) {
    updateLesson(id: $id, marked: $marked) {
      id
      marked
    }
  }
`;

export const updateLessonMutation = gql`
  mutation UpdateLesson($id: ID!, $text: String!) {
    updateLesson(id: $id, text: $text) {
      id
      text
    }
  }
`;

export const deleteLessonMutation = gql`
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;
