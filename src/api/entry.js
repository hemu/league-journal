import gql from 'graphql-tag';
import client from '../api/client';
import { updateMistakeMutation, deleteMistakeMutation } from './mistake';
import { updateLessonMutation, deleteLessonMutation } from './lesson';
import { entryFormInitialState } from '../modules/entryForm';

export const entriesByUserQuery = gql`
  query entriesByUserQuery(
    $user: String!
    $lastEvaluatedGameDate: String
    $lastEvaluatedID: ID
  ) {
    entriesByUser(
      user: $user
      lastEvaluatedGameDate: $lastEvaluatedGameDate
      lastEvaluatedID: $lastEvaluatedID
    ) @connection(key: "userEntries") {
      entries {
        id
        champion
        opponentChampion
        gameDate
        outcome
        role
        kills
        deaths
        assists
        gameId
        regionId
      }
      lastEvaluatedKey {
        gameDate
        user
        id
      }
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
    partner
    opponentPartner
    csPerMin
    cs
    video
    gameId
    regionId
  }
`;

export const entryByIdQuery = gql`
  query EntryQuery($id: ID!) {
    entryById(id: $id) {
      ...FullEntry
    }
  }
  ${fullEntryFragment}
`;

export const createEntryMutation = gql`
  mutation CreateEntry(
    $user: String!
    $gameId: String!
    $regionId: String!
    $gameDate: String
    $outcome: String
    $role: String
    $kills: Int
    $deaths: Int
    $assists: Int
    $champion: String
    $opponentChampion: String
    $partner: String
    $opponentPartner: String
    $csPerMin: Float
    $cs: [[Int]] # $video: String
  ) {
    createEntry(
      user: $user
      gameId: $gameId
      regionId: $regionId
      gameDate: $gameDate
      outcome: $outcome
      role: $role
      kills: $kills
      deaths: $deaths
      assists: $assists
      champion: $champion
      opponentChampion: $opponentChampion
      partner: $partner
      opponentPartner: $opponentPartner
      csPerMin: $csPerMin
      cs: $cs 
    ) {
      ...FullEntry
    }
  }
  ${fullEntryFragment}
`;

export const updateEntryMutation = gql`
  mutation UpdateEntry(
    $id: ID!
    $gameDate: String!
    $role: String
    $champion: String
    $opponentChampion: String
    $partner: String
    $opponentPartner: String
    $video: String
  ) {
    updateEntry(
      id: $id
      gameDate: $gameDate
      role: $role
      champion: $champion
      opponentChampion: $opponentChampion
      partner: $partner
      opponentPartner: $opponentPartner
      video: $video
    ) {
      ...FullEntry
    }
  }
  ${fullEntryFragment}
`;

export const deleteEntryMutation = gql`
  mutation DeleteEntry($id: ID!, $gameDate: String!) {
    deleteEntry(id: $id, gameDate: $gameDate)
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

export function fetchMoreEntries(user, lastEvaluatedKey) {
  if (lastEvaluatedKey.gameDate && lastEvaluatedKey.id) {
    return client.query({
      query: entriesByUserQuery,
      variables: {
        user,
        lastEvaluatedGameDate: lastEvaluatedKey.gameDate,
        lastEvaluatedID: lastEvaluatedKey.id,
      },
      fetchPolicy: 'network-only',
    });
  }
  return Promise.resolve();
}

export function fetchDetailEntry(entryId) {
  return client.query({
    query: entryByIdQuery,
    variables: { id: entryId },
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

const validateNum = (val) => (Number.isNaN(parseInt(val, 10)) ? 0 : val);

// XXX: What uses this functon? doesn't return anything...
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

export function createNewEntry(entry) {
  return client.mutate({
    mutation: createEntryMutation,
    variables: {
      // ...entryFormInitialState,
      gameDate: new Date().toISOString(),
      ...entry,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createEntry: {
        __typename: 'Entry',
        id: 'TEMP_LOCAL_ID',
        // ...entryFormInitialState,
        gameDate: new Date().toISOString(),
        ...entry,
      },
    },
    update: (proxy, { data: { createEntry } }) => {
      // Read the data from our cache for this query.
      try {
        const data = proxy.readQuery({
          query: entriesByUserQuery,
          variables: { user: entry.user },
        });
        // Add our comment from the mutation to the end.
        if (data.entriesByUser) {
          data.entriesByUser.entries.push(createEntry);
          // Write our data back to the cache.
          proxy.writeQuery({
            query: entriesByUserQuery,
            variables: { user: entry.user },
            data,
          });
        }
      } catch (error) {}
    },
  });
}

export function deleteEntry(entry) {
  return client.mutate({
    mutation: deleteEntryMutation,
    variables: {
      id: entry.id,
      gameDate: entry.gameDate,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteEntry: true,
    },
    update: (proxy, { data: { deleteEntry } }) => {
      // Read the data from our cache for this query.
      try {
        const data = proxy.readQuery({
          query: entriesByUserQuery,
          variables: { user: entry.user },
        });
        // Add our comment from the mutation to the end.
        if (data.entriesByUser) {
          data.entriesByUser.entries = data.entriesByUser.entries.filter(
            (queryEntry) => queryEntry.id !== entry.id,
          );
          // Write our data back to the cache.
          proxy.writeQuery({
            query: entriesByUserQuery,
            variables: { user: entry.user },
            data,
          });
        }
      } catch (error) {}
    },
  });
}
