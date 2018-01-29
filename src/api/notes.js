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
