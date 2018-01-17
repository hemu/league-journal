import gql from 'graphql-tag';
import client from '../api/client';
import { isLocalId } from '../helpers';

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

export const createEntryMutation = gql`
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
      csReasons: $csReasons
      video: $video
    ) {
      ...FullEntry
    }
  }
  ${fullEntryFragment}
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

export function fetchDetailEntry(entryId) {
  return client.query({
    query: entryDetailQuery,
    variables: { entryId },
    fetchPolicy: 'network-only',
  });
}

function createMistakesAndLessonsMutation(mistakes, lessons, entryId) {
  const singleMutation = (typeName, { text }, id) => {
    const alias = `alias_${Math.random()
      .toString(36)
      .slice(2)}`;

    return `
    ${alias}: create${typeName}(entryId: "${id}", text: "${text}", marked: false) {
      id
    }
  `;
  };

  const mistakesMutations = mistakes.map((mistake) =>
    singleMutation('Mistake', mistake, entryId));
  const lessonsMutations = lessons.map((lesson) =>
    singleMutation('Lesson', lesson, entryId));

  const joinedMistakes = mistakesMutations.join('\n');
  const joinedLessons = lessonsMutations.join('\n');

  return gql`
    mutation createMistakesAndLessons {
      ${joinedMistakes}
      ${joinedLessons}
    }
  `;
}

function updateMistakesAndLessons(mistakes, lessons, entryId) {
  const newMistakes = mistakes.filter(
    (mistake) => isLocalId(mistake.id) && mistake.text.trim().length !== 0,
  );
  const newLessons = lessons.filter(
    (lesson) => isLocalId(lesson.id) && lesson.text.trim().length !== 0,
  );
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

const validateNum = (val) => (Number.isNaN(parseInt(val, 10)) ? 0 : val);

export function saveEntry(entry) {
  const { lessons, mistakes, ...rest } = entry;

  // validate all number fields
  const finalEntry = {
    ...rest,
    gameDate: rest.gameDate || new Date(),
    outcome: rest.outcome || 'L',
    kills: validateNum(rest.kills),
    deaths: validateNum(rest.deaths),
    assists: validateNum(rest.assists),
    csPerMin: validateNum(rest.csPerMin),
    csAt5Min: validateNum(rest.csAt5Min),
    csAt10Min: validateNum(rest.csAt10Min),
    csAt15Min: validateNum(rest.csAt15Min),
    csAt20Min: validateNum(rest.csAt15Min),
    positives: rest.positives
      .map((item) => item.text)
      .filter((p) => p.trim().length !== 0),
    deathReasons: rest.deathReasons
      .map((item) => item.text)
      .filter((p) => p.trim().length !== 0),
    csReasons: rest.csReasons
      .map((item) => item.text)
      .filter((p) => p.trim().length !== 0),
  };

  return updateMistakesAndLessons(mistakes, lessons, entry.id).then(() =>
    client.mutate({
      mutation: saveEntryMutation,
      variables: {
        ...finalEntry,
      },
    }));
}

export function updateMistake(id, text) {
  return client.mutate({
    mutation: updateMistakeMutation,
    variables: {
      id,
      text,
    },
  });
}

export function removeMistake(id) {
  return client.mutate({
    mutation: deleteMistakeMutation,
    variables: {
      id,
    },
  });
}

export function updateLesson(id, text) {
  return client.mutate({
    mutation: updateLessonMutation,
    variables: {
      id,
      text,
    },
  });
}

export function removeLesson(id) {
  return client.mutate({
    mutation: deleteLessonMutation,
    variables: {
      id,
    },
  });
}

export function removeEntry(entryId, mistakes, lessons) {
  const singleDeleteMutation = (typeName, id, returnAlias = false) => {
    const alias = `alias_${Math.random()
      .toString(36)
      .slice(2)}`;

    const mutation = `
      ${alias}: delete${typeName}(id: "${id}") {
        id
      }
    `;

    if (returnAlias) {
      return [mutation, alias];
    }
    return mutation;
  };

  const mistakesMutations = mistakes.map((mistake) =>
    singleDeleteMutation('Mistake', mistake.id));
  const lessonsMutations = lessons.map((lesson) =>
    singleDeleteMutation('Lesson', lesson.id));
  const [entryMutation, entryMutationAlias] = singleDeleteMutation(
    'Entry',
    entryId,
    true,
  );

  const joinedMistakes = mistakesMutations.join('\n');
  const joinedLessons = lessonsMutations.join('\n');

  const finalMutation = gql`
      mutation deleteMistakesLessonsEntry {
        ${joinedMistakes}
        ${joinedLessons}
        ${entryMutation}
      }
    `;

  return client.mutate({
    mutation: finalMutation,
    optimisticResponse: {
      __typename: 'Mutation',
      [entryMutationAlias]: {
        __typename: 'Entry',
        id: entryId,
      },
    },
    update: (proxy, { data: updateData }) => {
      // Read the data from our cache for this query.
      const updateResults = updateData[entryMutationAlias];
      const data = proxy.readQuery({
        query: allEntriesQuery,
      });
      console.log('--------------');
      console.log(data);
      // Add our comment from the mutation to the end.
      data.allEntries = data.allEntries.filter(
        (entry) => entry.id !== updateResults.id,
      );
      // Write our data back to the cache.
      proxy.writeQuery({
        query: allEntriesQuery,
        data,
      });
    },
  });
}
