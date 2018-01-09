import gql from 'graphql-tag';
import client from '../api/client';
import { isLocalEntry, isLocalId } from '../helpers';

export const allEntriesQuery = gql`
  query AllEntriesQuery {
    allEntries {
      id
      champion
      opponentChampion
      gameDate
      outcome
      role
      kills
      deaths
      assists
    }
  }
`;

const fullEntryFragment = gql`
  fragment FullEntry on Entry {
    id
    createdAt
    updatedAt
    gameDate
    rank
    outcome
    role
    kills
    deaths
    assists
    champion
    opponentChampion
    jungler
    opponentJungler
    csPerMin
    csAt5Min
    csAt10Min
    csAt15Min
    csAt20Min
    mistakes {
      id
      text
      marked
    }
    positives
    lessons {
      id
      text
      marked
    }
    deathReasons
    roams
    ganks
    csReasons
    video
  }
`;

export const entryDetailQuery = gql`
  query EntryQuery($entryId: ID!) {
    Entry(id: $entryId) {
      ...FullEntry
    }
  }
  ${fullEntryFragment}
`;

const createEntryMutation = gql`
  mutation CreateEntry(
    $gameDate: DateTime!
    $rank: String
    $outcome: String
    $role: String!
    $kills: Int
    $deaths: Int
    $assists: Int
    $champion: String!
    $opponentChampion: String!
    $jungler: String
    $opponentJungler: String
    $csPerMin: Float
    $csAt5Min: Int
    $csAt10Min: Int
    $csAt15Min: Int
    $csAt20Min: Int
    $positives: [String!]
    $deathReasons: [String!]
    $roams: [String!]
    $csReasons: [String!]
    $video: String
  ) {
    createEntry(
      gameDate: $gameDate
      rank: $rank
      outcome: $outcome
      role: $role
      kills: $kills
      deaths: $deaths
      assists: $assists
      champion: $champion
      opponentChampion: $opponentChampion
      jungler: $jungler
      opponentJungler: $opponentJungler
      csPerMin: $csPerMin
      csAt5Min: $csAt5Min
      csAt10Min: $csAt10Min
      csAt15Min: $csAt15Min
      csAt20Min: $csAt20Min
      positives: $positives
      deathReasons: $deathReasons
      roams: $roams
      csReasons: $csReasons
      video: $video
    ) {
      id
    }
  }
`;

export const saveEntryMutation = gql`
  mutation SaveEntry(
    $id: ID!
    $gameDate: DateTime!
    $rank: String
    $outcome: String
    $role: String!
    $kills: Int
    $deaths: Int
    $assists: Int
    $champion: String!
    $opponentChampion: String!
    $jungler: String
    $opponentJungler: String
    $csPerMin: Float
    $csAt5Min: Int
    $csAt10Min: Int
    $csAt15Min: Int
    $csAt20Min: Int
    # $mistakes: [String!]
    # $lessons: [String!]
    $positives: [String!]
    $deathReasons: [String!]
    $roams: [String!]
    $csReasons: [String!]
    $video: String
  ) {
    updateEntry(
      id: $id
      gameDate: $gameDate
      rank: $rank
      outcome: $outcome
      role: $role
      kills: $kills
      deaths: $deaths
      assists: $assists
      champion: $champion
      opponentChampion: $opponentChampion
      jungler: $jungler
      opponentJungler: $opponentJungler
      csPerMin: $csPerMin
      csAt5Min: $csAt5Min
      csAt10Min: $csAt10Min
      csAt15Min: $csAt15Min
      csAt20Min: $csAt20Min
      # mistakes: $mistakes
      # lessons: $lessons
      positives: $positives
      deathReasons: $deathReasons
      roams: $roams
      csReasons: $csReasons
      video: $video
    ) {
      ...FullEntry
    }
  }
  ${fullEntryFragment}
`;

export const markMistakeMutation = gql`
  mutation UpdateMistake($id: ID!, $marked: Boolean!) {
    updateMistake(id: $id, marked: $marked) {
      id
      marked
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

const deleteEntryMutation = gql`
  mutation DeleteEntry($id: ID!) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

const updateMistakeMutation = gql`
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

const updateLessonMutation = gql`
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

export const createMistakeMutation = gql`
  mutation CreateMistake($entryId: ID!, $text: String!, $marked: Boolean!) {
    createMistake(entryId: $entryId, text: $text, marked: $marked) {
      id
    }
  }
`;

export const createLessonMutation = gql`
  mutation CreateLesson($entryId: ID!, $text: String!, $marked: Boolean!) {
    createLesson(entryId: $entryId, text: $text, marked: $marked) {
      id
    }
  }
`;

export function fetchAllEntries() {
  return client.query({
    query: allEntriesQuery,
    fetchPolicy: 'network-only',
  });
}

export function fetchDetailEntry(entryId) {
  return client.query({
    query: entryDetailQuery,
    variables: { entryId },
    fetchPolicy: 'network-only',
  });
}

function createMistakesAndLessonsMutation(mistakes, lessons, entryId) {
  const singleMutation = (typeName, { text }, entryId) => {
    const alias = `alias_${Math.random()
      .toString(36)
      .slice(2)}`;

    return `
    ${alias}: create${typeName}(entryId: "${entryId}", text: "${text}", marked: false) {
      id
    }
  `;
  };

  const mistakesMutations = mistakes.map(mistake =>
    singleMutation('Mistake', mistake, entryId));
  const lessonsMutations = lessons.map(lesson =>
    singleMutation('Lesson', lesson, entryId));

  const joinedMistakes = mistakesMutations.join('\n');
  const joinedLessons = lessonsMutations.join('\n');

  console.log(`
    mutation createMistakesAndLessons {
      ${joinedMistakes}
      ${joinedLessons}
    }
  `);

  return gql`
    mutation createMistakesAndLessons {
      ${joinedMistakes}
      ${joinedLessons}
    }
  `;
}

function updateMistakesAndLessons(mistakes, lessons, entryId) {
  const newMistakes = mistakes.filter(mistake => isLocalId(mistake.id) && mistake.text.trim() !== '');
  const newLessons = lessons.filter(lesson => isLocalId(lesson.id) && lesson.text.trim() !== '');
  if (newMistakes.length === 0 && newLessons.length === 0) {
    return Promise.resolve();
  }
  const mutation = createMistakesAndLessonsMutation(
    newMistakes,
    newLessons,
    entryId,
  );
  return client.mutate({
    mutation,
  });
}

// function updateMistakesAndLessons(mistakes, lessons, entryId) {
//   mistakes
//     .filter(mistake => isLocalId(mistake.id) && mistake.text.trim() !== '')
//     .forEach(mistake =>
//       client.mutate({
//         mutation: createMistakeMutation,
//         variables: {
//           entryId,
//           text: mistake.text,
//           marked: false,
//         },
//       }));
//   lessons
//     .filter(lesson => isLocalId(lesson.id) && lesson.text.trim() !== '')
//     .forEach(lesson =>
//       client.mutate({
//         mutation: createLessonMutation,
//         variables: {
//           entryId,
//           text: lesson.text,
//           marked: false,
//         },
//       }));
// }

export function saveEntry(entry) {
  const { lessons, mistakes, ...filteredEntry } = entry;

  // if (isLocalEntry(entry.id)) {
  //   return client
  //     .mutate({
  //       mutation: createEntryMutation,
  //       variables: {
  //         ...filteredEntry,
  //       },
  //       optimisticResponse: {
  //         __typename: 'Mutation',
  //         updateEntry: {
  //           __typename: 'Entry',
  //           ...entry,
  //         },
  //       },
  //     })
  //     .then((result) => {
  //       if (result.data) {
  //         const { data: { createEntry: { id: entryId } } } = result;
  //         console.log(`updating mistakes and lessons with entryId: ${entryId}`);
  //         return updateMistakesAndLessons(mistakes, lessons, entryId);
  //       }
  //     });
  // }

  return updateMistakesAndLessons(mistakes, lessons, entry.id).then(result =>
    client.mutate({
      mutation: saveEntryMutation,
      variables: {
        ...filteredEntry,
      },
    }));
}

export function updateMistake(id, text) {
  console.log(`Updating mistake ${id} ${text}`);
  // return Promise.resolve('updating mistake stub.......');
  return client.mutate({
    mutation: updateMistakeMutation,
    variables: {
      id,
      text,
    },
  });
}

export function removeMistake(id) {
  console.log(`Removing mistake ${id}`);
  return client.mutate({
    mutation: deleteMistakeMutation,
    variables: {
      id,
    },
  });
}

export function updateLesson(id, text) {
  console.log(`Updating lesson ${id} ${text}`);
  // return Promise.resolve('updating mistake stub.......');
  return client.mutate({
    mutation: updateLessonMutation,
    variables: {
      id,
      text,
    },
  });
}

export function removeLesson(id) {
  console.log(`Removing lesson ${id}`);
  return client.mutate({
    mutation: deleteLessonMutation,
    variables: {
      id,
    },
  });
}

export function removeEntry(entryId, mistakes, lessons) {
  mistakes
    .filter(mistake => !isLocalId(mistake.id))
    .forEach(mistake => removeMistake(mistake.id));
  lessons
    .filter(lesson => !isLocalId(lesson.id))
    .forEach(lesson => removeLesson(lesson.id));
  return client.mutate({
    mutation: deleteEntryMutation,
    variables: {
      id: entryId,
    },
  });
}
