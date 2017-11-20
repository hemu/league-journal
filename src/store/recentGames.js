import { types, flow } from "mobx-state-tree";
import client from "../api/client";
import { getRecentGames } from "../api/riot";
import { getChampByKey } from "../staticData/champion";
import { seasonMap, getQueue, roleToLane } from "../staticData/match";

export const RecentGame = types.model("RecentGame", {
  gameId: types.optional(types.number, 0),
  champion: types.optional(types.string, ""),
  platformId: types.optional(types.string, ""),
  season: types.optional(types.string, ""),
  queue: types.optional(types.string, ""),
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

      const resp = yield getRecentGames("232004309");
      const { data: { matches } } = resp;

      // transform data
      self.games = matches.map(match => ({
        ...match,
        champion: getChampByKey(match.champion),
        season: seasonMap[match.season],
        queue: getQueue(match.queue),
        role: roleToLane(match.role, match.lane)
      }));

      self.fetching = false;
      self.loaded = true;
    });

    return { fetchRecentGames };
  });

export default RecentGames;
