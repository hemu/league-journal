import axios from 'axios';
// import { recentGamesMock } from './mock';

// const PROXY_ADDRESS = 'http://localhost:8080';
export function getRecentGames(summonerId) {
  // return recentGamesMock();
  return axios
    .post(
      // 'https://i4p7uxr4ze.execute-api.us-east-1.amazonaws.com/dev/recentGames',
      'http://localhost:8080/recentGames',
      {
        summonerId,
      },
    )
    .then((result) => result.data);
}

export function getMatchDetails(matchId, summonerId) {
  return axios
    .post(
      // 'https://i4p7uxr4ze.execute-api.us-east-1.amazonaws.com/dev/matchDetail',
      'http://localhost:8080/matchDetail',
      {
        summonerId,
        matchId,
      },
    )
    .then((result) => result.data);
}
