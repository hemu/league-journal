import axios from "axios";

export function getRecentGamesRequester(accountId) {
  return () =>
    axios.get(
      "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/232004309/recent?api_key=RGAPI-70b9a43d-b925-4aaf-8da7-5eb3b013d4f1",
      {
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
}
