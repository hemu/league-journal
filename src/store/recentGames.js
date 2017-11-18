import { types, flow } from "mobx-state-tree";
import client from "../api/client";
import { getRecentGamesRequester } from "../api/riot";

export const RecentGame = types.model("RecentGame", {
  id: types.optional(types.string, ""),
  gameId: types.optional(types.number, 0),
  champion: types.optional(types.number, 0),
  platformId: types.optional(types.string, ""),
  season: types.optional(types.number, 0),
  queue: types.optional(types.number, 0),
  role: types.optional(types.string, ""),
  timestamp: types.optional(types.number, 0)
});

const RecentGames = types
  .model("RecentGames", {
    games: types.optional(types.array(RecentGame), []),
    fetching: types.optional(types.boolean, false),
    loaded: types.optional(types.boolean, false)
  })
  .views(self => ({}))
  .actions(self => {
    const fetchRecentGames = flow(function*() {
      self.fetching = true;
      self.loaded = false;

      const resp = yield getRecentGamesRequester()();

      console.log("recent games request done.......");
      console.log(resp);

      // const { data: { allEntries } } = yield client.query({
      //   query: allEntriesQuery,
      //   fetchPolicy: "network-only"
      // });
      // self.entries = allEntries;
      self.fetching = false;
      self.loaded = true;
      // if (allEntries.length > 0) {
      //   self.entryDetailStore.setEntry(allEntries[0].id);
      // }
    });

    return { fetchRecentGames };
  });

export default RecentGames;
