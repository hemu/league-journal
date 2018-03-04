import axios from 'axios';
import { recentGamesMock } from './mock';
import { API } from 'aws-amplify';

const IS_LOCAL = true;

const endPointBase = IS_LOCAL
  ? 'http://localhost:8080'
  : 'https://i4p7uxr4ze.execute-api.us-east-1.amazonaws.com/dev';

export function getRecentGames(summonerId) {
  // return recentGamesMock();
  return axios
    .post(
      `${endPointBase}/recentGames`,
      {
        summonerId,
      },
      {
        headers: {
          Authorization:
            'eyJraWQiOiJacXBwOEl5SkNXS3RrRGNhSDdyK0FBRzkrQThtdXN6WldSZ0Z3Q2tlZGRJPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206c3VtbW9uZXIiOiJoZW11Iiwic3ViIjoiNDRkZGYwODYtMGJjNS00Yjc3LTg0M2MtNDQwMTA3YzU1MzI4IiwiYXVkIjoiM21obW9mYzd2cm1xYnVlcmNrM3I1aXVmczkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZXZlbnRfaWQiOiJlMTBkYWE3My0xZDZkLTExZTgtYjljNy0yOWExMDgzZmU4NTciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUxOTkyMTg0MCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfeWlNMjU3VUdMIiwiY29nbml0bzp1c2VybmFtZSI6IjQ0ZGRmMDg2LTBiYzUtNGI3Ny04NDNjLTQ0MDEwN2M1NTMyOCIsImV4cCI6MTUxOTkyNTQ0MCwiaWF0IjoxNTE5OTIxODQwLCJlbWFpbCI6ImhtdWFyMzRAZ21haWwuY29tIn0.FzTiZyAVsmYH_TseXAk3MTC1rmmAFeYA0iLonBlAQ-n7C8elLAkWS05nHkioADtpN7oYrhUrvLL_Jy1VJTNmY0yvxFE8cYXOrvIFrDvH8PuyZKQlXb_XtBU_65okH4VbZs4ws1ccUFhQ2bVKQnLl_6RSGoTkD_lqN0SQ51GxHAwD5U4qk-vPM3FwSgoyxRuVcm9l9MDMyJcXzWInTTSdmuF_IVJOHaN1Ku69HVT0vHyVeZFg33uWa_TigK_lJaB0IJ0aUtJEHpaZcoVAnEiHRg8Ko57yPh1OnA7pKJWXkgKBNg3ltlngBwKiQsdZUwkPjUSwxGxF6hZ_ND1uRiKn9Q',
        },
      },
    )
    .then((result) => result.data);
  // return API.post('recentGames', '', { summonerId }).then(
  //   (result) => result.data,
  // );
}

export function getMatchDetails(matchId, summonerId) {
  return axios
    .post(`${endPointBase}/matchDetail`, {
      summonerId,
      matchId,
    })
    .then((result) => {
      console.log(result.data);
      return result.data;
    });
}

export function fetchSummonerAccount(summonerName) {
  return axios
    .post(`${endPointBase}/account`, {
      summonerName,
    })
    .then((result) => result.data);
}
