import client from "../api/client";
import gql from "graphql-tag";
import { isLocalEntry } from "../helpers";

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
    mistakes
    positives
    lessons
    deathReasons
    roams
    ganks
    csReasons
    video
  }
`;

const entryDetailQuery = gql`
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
    $mistakes: [String!]
    $positives: [String!]
    $lessons: [String!]
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
      mistakes: $mistakes
      positives: $positives
      lessons: $lessons
      deathReasons: $deathReasons
      roams: $roams
      csReasons: $csReasons
      video: $video
    ) {
      id
    }
  }
`;

const saveEntryMutation = gql`
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
    $mistakes: [String!]
    $positives: [String!]
    $lessons: [String!]
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
      mistakes: $mistakes
      positives: $positives
      lessons: $lessons
      deathReasons: $deathReasons
      roams: $roams
      csReasons: $csReasons
      video: $video
    ) {
      id
    }
  }
`;

export function fetchAllEntries() {
  return client.query({
    query: allEntriesQuery,
    fetchPolicy: "network-only"
  });
}

export function fetchDetailEntry(entryId) {
  return client.query({
    query: entryDetailQuery,
    variables: { entryId: entryId },
    fetchPolicy: "network-only"
  });
}

export function saveEntry(entry) {
  return client.mutate({
    mutation: isLocalEntry(entry.id) ? createEntryMutation : saveEntryMutation,
    variables: {
      ...entry
    }
  });
}
