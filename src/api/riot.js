import axios from 'axios';
import { HARDCODED_ACCOUNT_ID } from '../const';
import { recentGamesMock } from './mock';

// const PROXY_ADDRESS = 'http://localhost:8080';
export function getRecentGames(accountId = HARDCODED_ACCOUNT_ID) {
  // return recentGamesMock();
  return axios
    .post(
      // 'https://i4p7uxr4ze.execute-api.us-east-1.amazonaws.com/dev/recentGames',
      'http://localhost:8080/recentGames',
      {
        accountId,
      },
    )
    .then((result) => result.data);
}

export function getMatchDetails(matchId, accountId = HARDCODED_ACCOUNT_ID) {
  return axios
    .post(
      // 'https://i4p7uxr4ze.execute-api.us-east-1.amazonaws.com/dev/matchDetail',
      'http://localhost:8080/matchDetail',
      {
        accountId,
        matchId,
      },
    )
    .then((result) => result.data);
}
