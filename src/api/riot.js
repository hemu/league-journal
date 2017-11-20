import axios from "axios";

const API_KEY = "RGAPI-d33b8d20-3d2f-4357-994b-432e5595d1ef";
const PROXY_ADDRESS = "http://localhost:8080";

export function getRecentGames(accountId) {
  return axios.get(
    // "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/232004309/recent?api_key=RGAPI-4f7d0c00-b30e-4f58-92cb-59ad6a12ba6c",
    `${PROXY_ADDRESS}/https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${API_KEY}`
  );
}
