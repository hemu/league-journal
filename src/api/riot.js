import axios from 'axios';

export function getRecentGames(summonerId) {
  return axios
    .post(
      // 'https://i4p7uxr4ze.execute-api.us-east-1.amazonaws.com/dev/recentGames',
      'http://localhost:8080/recentGames',
      {
        summonerId,
      },
    )
    .then((result) => ({ error: null, games: result.data }))
    .catch((error) => {
      if (error.response) {
        return {
          error:
            "Can't find your recent games because riot's servers won't talk back to us :(",
          games: [],
        };
      } else if (error.request) {
        return {
          error:
            "Can't connect to riot servers to get your recent games. Are you sure your internet is ok?",
          games: [],
        };
      }
      return {
        error:
          'Something is going wrong when trying to find your recent games :(',
        games: [],
      };
    });
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
