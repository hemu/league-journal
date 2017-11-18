import { types, flow } from "mobx-state-tree";
import client from "../api/client";
import gql from "graphql-tag";
import EntryDetail from "./entryDetail";

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

export const deleteEntryMutation = gql`
  mutation DeleteEntry($id: ID!) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

export const Entry = types.model("Entry", {
  id: types.optional(types.string, "TEMP_LOCAL_ID"),
  gameDate: types.optional(types.string, new Date().toString()),
  outcome: types.optional(
    types.union(types.literal("W"), types.literal("L")),
    "W"
  ),
  role: types.optional(types.string, ""),
  kills: types.optional(types.union(types.number, types.string), ""),
  deaths: types.optional(types.union(types.number, types.string), 0),
  assists: types.optional(types.union(types.number, types.string), 0),
  champion: types.optional(types.string, ""),
  opponentChampion: types.optional(types.string, "")
});

const Entries = types
  .model("Entries", {
    entries: types.optional(types.array(Entry), []),
    fetching: types.optional(types.boolean, false),
    loaded: types.optional(types.boolean, false),
    entryDetailStore: types.optional(EntryDetail, EntryDetail.create())
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
      if (allEntries.length > 0) {
        self.entryDetailStore.setEntry(allEntries[0].id);
      }
    });

    const createEntry = () => {
      self.entries.push(Entry.create());
    };

    const removeEntry = flow(function*(entryId) {
      const results = yield client.mutate({
        mutation: deleteEntryMutation,
        variables: {
          id: entryId
        }
      });
      self.fetchEntries();
    });

    return { fetchEntries, createEntry, removeEntry };
  });

export default Entries;
