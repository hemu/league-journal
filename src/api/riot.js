import axios from 'axios';

export function getRecentGames(summonerId, regionId) {
  return axios
    .post(process.env.REACT_APP_RECENT_GAMES_ENDPOINT, {
      summonerId,
      regionId,
    })
    .then((result) => ({ error: null, games: result.data }))
    .catch((error) => {
      if (error.response) {
        return {
          error:
            "Can't find your recent games because riot's servers won't talk back to us right now :(",
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

export function getMatchDetails(matchId, summonerId, regionId) {
  return axios
    .post(process.env.REACT_APP_MATCH_DETAILS_ENDPOINT, {
      summonerId,
      matchId,
      regionId,
    })
    .then((result) => result.data);
}
