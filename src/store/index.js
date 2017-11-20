import Entries from "./entries";
import RecentGames from "./recentGames";
import makeInspectable from "mobx-devtools-mst";

const entries = Entries.create();
entries.fetchEntries();
makeInspectable(entries);

const recentGames = RecentGames.create();
recentGames.fetchRecentGames();
makeInspectable(recentGames);
//
export default { entries, recentGames };
