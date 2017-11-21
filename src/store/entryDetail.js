import { types, flow, getSnapshot, applySnapshot } from "mobx-state-tree";
import { Entry } from "./entries";
import client from "../api/client";
import gql from "graphql-tag";
import { entryFields, isLocalEntry } from "./entries";
import moment from "moment";

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

const createEntryMutation = gql`
  mutation CreateEntry(
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
    createEntry(
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
    entryDetailId: types.optional(types.string, ""),
    fetching: types.optional(types.boolean, false),
    loaded: types.optional(types.boolean, false),
    id: types.optional(types.string, "TEMP_LOCAL_ID"),
    gameDate: types.optional(types.Date, new Date()),
    rank: types.optional(types.string, ""),
    outcome: types.optional(
      types.union(types.literal("W"), types.literal("L")),
      "W"
    ),
    role: types.optional(types.string, ""),
    champion: types.optional(types.string, ""),
    opponentChampion: types.optional(types.string, ""),
    jungler: types.optional(types.string, ""),
    opponentJungler: types.optional(types.string, ""),
    kills: types.optional(types.union(types.number, types.string), ""),
    deaths: types.optional(types.union(types.number, types.string), 0),
    assists: types.optional(types.union(types.number, types.string), 0),
    lpChange: types.optional(types.union(types.number, types.string), ""),
    csPerMin: types.optional(types.union(types.number, types.string), 0),
    csAt5Min: types.optional(types.union(types.number, types.string), 0),
    csAt10Min: types.optional(types.union(types.number, types.string), 0),
    csAt15Min: types.optional(types.union(types.number, types.string), 0),
    csAt20Min: types.optional(types.union(types.number, types.string), 0),

    mistakes: types.optional(types.array(types.string), []),
    positives: types.optional(types.array(types.string), []),
    lessons: types.optional(types.array(types.string), []),
    deathReasons: types.optional(types.array(types.string), []),
    roams: types.optional(types.array(types.string), []),
    csReasons: types.optional(types.array(types.string), []),
    video: types.optional(types.string, "")
  })
  .views(self => ({
    get formattedGameDate(): string {
      return moment(new Date(self.gameDate)).format("MMM Do");
    }
  }))
  .actions(self => {
    const setEntry = entryId => {
      const fetchEntry = flow(function*() {
        self.fetching = true;
        self.loaded = false;
        // const { data: { Entry: fetchedEntry } } = yield client.query({
        if (isLocalEntry(entryId)) {
          applySnapshot(self, {
            id: entryId,
            gameDate: new Date()
          });
        } else {
          const results = yield client.query({
            query: entryQuery,
            variables: { entryId: entryId },
            fetchPolicy: "network-only"
          });

          const { data: { Entry: fetchedEntry } } = results;
          Object.assign(self, {
            ...fetchedEntry,
            gameDate: new Date(fetchedEntry.gameDate)
          });
        }
        self.fetching = false;
        self.loaded = true;
        self.entryDetailId = entryId;
      });
      fetchEntry();
    };

    const saveEntry = () => {
      const tryInt = inpString => {
        const num = parseInt(inpString, 10);
        return num ? num : 0;
      };

      const saveEntry = flow(function*() {
        const results = yield client.mutate({
          mutation:
            self.id === "TEMP_LOCAL_ID"
              ? createEntryMutation
              : saveEntryMutation,
          variables: {
            ...getSnapshot(self),
            kills: tryInt(self.kills),
            deaths: tryInt(self.deaths),
            assists: tryInt(self.assists),
            lpChange: tryInt(self.lpChange),
            csPerMin: tryInt(self.csPerMin),
            csAt5Min: tryInt(self.csAt5Min),
            csAt10Min: tryInt(self.csAt10Min),
            csAt15Min: tryInt(self.csAt15Min),
            csAt20Min: tryInt(self.csAt20Min),
            gameDate: self.gameDate.toISOString()
          }
        });
        if (self.id === "TEMP_LOCAL_ID") {
          self.id = results.data.createEntry.id;
        }
      });
      saveEntry();
    };

    const addString = stringKey => {
      self[stringKey].push("");
    };
    const stringChanger = stringKey => {
      return (elemIndex, newString) => {
        if (self[stringKey].length > elemIndex - 1) {
          self[stringKey][elemIndex] = newString;
        }
      };
    };

    const addMistake = () => addString("mistakes");
    const changeMistake = stringChanger("mistakes");

    const addPositive = () => addString("positives");
    const changePositive = stringChanger("positives");

    const addLesson = () => addString("lessons");
    const changeLesson = stringChanger("lessons");

    const addDeathReason = () => addString("deathReasons");
    const changeDeathReason = stringChanger("deathReasons");

    const addRoam = () => addString("roams");
    const changeRoam = stringChanger("roams");

    const addGank = () => addString("ganks");
    const changeGank = stringChanger("ganks");

    const addCsReason = () => addString("csReasons");
    const changeCsReason = stringChanger("csReasons");

    const changeVideo = newText => (self.video = newText);

    const changeGameDate = newDate => (self.gameDate = newDate);
    const changeRank = newRank => (self.rank = newRank);
    const changeOutcome = newOutcome => (self.outcome = newOutcome);
    const changeLp = newLp => (self.lpChange = newLp);
    const changeRole = newRole => (self.role = newRole);
    const changeKills = newKills => (self.kills = newKills);
    const changeDeaths = newDeaths => (self.deaths = newDeaths);
    const changeAssists = newAssists => (self.assists = newAssists);

    const changeChampion = newChamp => (self.champion = newChamp);
    const changeOpponentChampion = newChamp =>
      (self.opponentChampion = newChamp);
    const changeJungler = newChamp => (self.jungler = newChamp);
    const changeOpponentJungler = newChamp => (self.opponentJungler = newChamp);

    const changeCsPerMin = newVal => (self.csPerMin = newVal);
    const changeCsAt5Min = newVal => (self.csAt5Min = newVal);
    const changeCsAt10Min = newVal => (self.csAt10Min = newVal);
    const changeCsAt15Min = newVal => (self.csAt15Min = newVal);
    const changeCsAt20Min = newVal => (self.csAt20Min = newVal);

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
      changeVideo,
      changeGameDate,

      changeRank,
      changeOutcome,
      changeLp,
      changeRole,
      changeKills,
      changeDeaths,
      changeAssists,
      changeChampion,
      changeOpponentChampion,
      changeJungler,
      changeOpponentJungler,
      changeCsPerMin,
      changeCsAt5Min,
      changeCsAt10Min,
      changeCsAt15Min,
      changeCsAt20Min
    };
  });

export default EntryDetail;
