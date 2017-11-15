import { types, flow, getSnapshot } from "mobx-state-tree";
import { Entry } from "./entries";
import client from "../api/client";
import gql from "graphql-tag";
import { entryFields } from "./entries";

const fullEntryFragment = gql`
  fragment FullEntry on Entry {
    id
    createdAt
    updatedAt
    gameDate
    rank
    outcome
    lpChange
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

const entryQuery = gql`
  query EntryQuery($entryId: ID!) {
    Entry(id: $entryId) {
      ...FullEntry
    }
  }
  ${fullEntryFragment}
`;

const saveEntryMutation = gql`
  mutation SaveEntry(
    $id: ID!
    $gameDate: DateTime!
    $rank: String
    $outcome: String
    $lpChange: Int
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
      lpChange: $lpChange
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

const EntryDetail = types
  .model("EntryDetail", {
    detailEntryId: types.optional(types.string, ""),
    fetching: types.optional(types.boolean, false),
    loaded: types.optional(types.boolean, false),
    id: types.optional(types.string, ""),
    ...entryFields
  })
  .views(self => ({}))
  .actions(self => {
    const setEntry = entryId => {
      const fetchEntry = flow(function*() {
        self.fetching = true;
        self.loaded = false;
        // const { data: { Entry: fetchedEntry } } = yield client.query({
        const results = yield client.query({
          query: entryQuery,
          variables: { entryId: entryId },
          fetchPolicy: "network-only"
        });

        const { data: { Entry: fetchedEntry } } = results;
        self.fetching = false;
        self.loaded = true;
        self.detailEntryId = entryId;
        console.log(results);
        Object.assign(self, fetchedEntry);
      });
      fetchEntry();
    };

    const saveEntry = () => {
      const saveEntry = flow(function*() {
        const results = yield client.mutate({
          mutation: saveEntryMutation,
          variables: getSnapshot(self)
        });
      });
      saveEntry();
    };

    const addString = stringKey => {
      self[stringKey].push("");
    };
    const changeString = (stringKey, elemIndex, newString) => {
      if (self[stringKey].length > elemIndex - 1) {
        self[stringKey][elemIndex] = newString;
      }
    };

    const addMistake = () => addString("mistakes");
    const changeMistake = (elemIndex, newText) =>
      changeString("mistakes", elemIndex, newText);

    const addPositive = () => addString("positives");
    const changePositive = (elemIndex, newText) =>
      changeString("positives", elemIndex, newText);

    const addLesson = () => addString("lessons");
    const changeLesson = (elemIndex, newText) =>
      changeString("lessons", elemIndex, newText);

    const addDeathReason = () => addString("deathReasons");
    const changeDeathReason = (elemIndex, newText) =>
      changeString("deathReasons", elemIndex, newText);

    const addRoam = () => addString("roams");
    const changeRoam = (elemIndex, newText) =>
      changeString("roams", elemIndex, newText);

    const addGank = () => addString("ganks");
    const changeGank = (elemIndex, newText) =>
      changeString("ganks", elemIndex, newText);

    const addCsReason = () => addString("csReasons");
    const changeCsReason = (elemIndex, newText) =>
      changeString("csReasons", elemIndex, newText);

    const changeVideo = newText => (self.video = newText);

    return {
      setEntry,
      saveEntry,
      addMistake,
      changeMistake,
      addPositive,
      changePositive,
      addLesson,
      changeLesson,
      addDeathReason,
      changeDeathReason,
      addRoam,
      changeRoam,
      addGank,
      changeGank,
      addCsReason,
      changeCsReason,
      changeVideo
    };
  });

export default EntryDetail;
