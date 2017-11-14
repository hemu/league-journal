import { types, flow } from "mobx-state-tree";
import client from "../api/client";
import gql from "graphql-tag";

export const allEntriesQuery = gql`
  query AllEntriesQuery {
    allEntries {
      id
      champion
      opponentChampion
      gameDate
    }
  }
`;

export const Entry = types.model("Entry", {
  id: types.string,
  createdAt: types.maybe(types.Date),
  updatedAt: types.maybe(types.Date),

  gameDate: types.maybe(types.string),
  rank: types.maybe(types.string),
  outcome: types.maybe(types.union(types.literal("W"), types.literal("L"))),
  lpChange: types.maybe(types.number),
  role: types.maybe(types.string),
  kills: types.maybe(types.number),
  deaths: types.maybe(types.number),
  assists: types.maybe(types.number),
  champion: types.maybe(types.string),
  opponentChampion: types.maybe(types.string),
  jungler: types.maybe(types.string),
  opponentJungler: types.maybe(types.string),
  csPerMin: types.maybe(types.number),
  csAt5Min: types.maybe(types.number),
  csAt10Min: types.maybe(types.number),
  csAt15Min: types.maybe(types.number),
  csAt20Min: types.maybe(types.number),

  mistakes: types.maybe(types.array(types.string)),
  positives: types.maybe(types.array(types.string)),
  lessons: types.maybe(types.array(types.string)),
  deathReasons: types.maybe(types.array(types.string)),
  roams: types.maybe(types.array(types.string)),
  ganks: types.maybe(types.array(types.string)),
  csReasons: types.maybe(types.array(types.string)),
  video: types.maybe(types.string)
});

const Entries = types
  .model("Entries", {
    entries: types.optional(types.array(Entry), []),
    fetching: types.optional(types.boolean, false),
    loaded: types.optional(types.boolean, false)
  })
  .views(self => ({}))
  .actions(self => {
    const fetchEntries = flow(function*() {
      self.fetching = true;
      self.loaded = false;
      const { data: { allEntries } } = yield client.query({
        query: allEntriesQuery,
        fetchPolicy: "network-only"
      });
      self.entries = allEntries;
      self.fetching = false;
      self.loaded = true;
    });

    const newEntry = () => {
      self.entries.push(Entry.create());
    };

    return { fetchEntries, newEntry };
  });

export default Entries;
