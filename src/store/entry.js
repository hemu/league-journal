import { types, flow } from "mobx-state-tree";
import client from "../api/client";
import gql from "graphql-tag";

export const allEntriesQuery = gql`
  query AllEntriesQuery {
    allEntries {
      id
    }
  }
`;

const Entry = types.model("Entry", {
  id: types.string,
  createdAt: types.maybe(types.Date),
  updatedAt: types.maybe(types.Date),
  // gameStats: types.maybe(types.map()),
  mistake: types.maybe(types.array(types.string)),
  positive: types.maybe(types.array(types.string)),
  lesson: types.maybe(types.array(types.string)),
  deathReason: types.maybe(types.array(types.string)),
  roam: types.maybe(types.array(types.string)),
  gank: types.maybe(types.array(types.string)),
  csFail: types.maybe(types.array(types.string)),
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
