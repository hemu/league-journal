import axios from 'axios';

const API_KEY = 'RGAPI-4b6992c7-a00a-444e-8fb5-7af7fda7bdc8';
const PROXY_ADDRESS = 'http://localhost:8080';

export function getRecentGames(accountId) {
  return axios.get(
    // "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/232004309/recent?api_key=RGAPI-4f7d0c00-b30e-4f58-92cb-59ad6a12ba6c",
    `${PROXY_ADDRESS}/https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${API_KEY}`,
  );
}
