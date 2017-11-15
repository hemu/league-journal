import { types, flow } from "mobx-state-tree";
import client from "../api/client";
import gql from "graphql-tag";

export const entryFields = {
  gameDate: types.optional(types.string, new Date().toString()),
  rank: types.optional(types.string, ""),
  outcome: types.optional(
    types.union(types.literal("W"), types.literal("L")),
    "W"
  ),
  lpChange: types.optional(types.number, 0),
  role: types.optional(types.string, ""),
  kills: types.optional(types.number, 0),
  deaths: types.optional(types.number, 0),
  assists: types.optional(types.number, 0),
  champion: types.optional(types.string, ""),
  opponentChampion: types.optional(types.string, ""),
  jungler: types.optional(types.string, ""),
  opponentJungler: types.optional(types.string, ""),
  csPerMin: types.optional(types.number, 0),
  csAt5Min: types.optional(types.number, 0),
  csAt10Min: types.optional(types.number, 0),
  csAt15Min: types.optional(types.number, 0),
  csAt20Min: types.optional(types.number, 0),

  mistakes: types.optional(types.array(types.string), []),
  positives: types.optional(types.array(types.string), []),
  lessons: types.optional(types.array(types.string), []),
  deathReasons: types.optional(types.array(types.string), []),
  roams: types.optional(types.array(types.string), []),
  csReasons: types.optional(types.array(types.string), []),
  video: types.optional(types.string, "")
};

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
  ...entryFields
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
