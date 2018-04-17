import auth0 from 'auth0-js';
import getStore, { routerHistory } from '../store';
import { AUTH_CONFIG } from './auth0-variables';
import { setAuth } from '../modules/auth';

export function isAuthenticated() {
  // Check whether the current time is past the
  // access token's expiry time
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  if (expiresAt && new Date().getTime() < expiresAt) {
    const userId = localStorage.getItem('user_id');
    const summoner = localStorage.getItem('summoner');
    const summonerId = localStorage.getItem('summonerId');
    const regionId = localStorage.getItem('regionId');
    getStore().dispatch(setAuth(userId, summoner, summonerId, regionId));
    return true;
  }
  return false;
}

const authService = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid',
});

function setSession(authResult) {
  // Set the time that the access token will expire at
  const { idTokenPayload, accessToken, idToken, expiresIn } = authResult;
  const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
  const userId = idTokenPayload.sub;
  const { summoner, summonerId, regionId } = idTokenPayload[
    'https://lol-journal.com/user_metadata'
  ];
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('id_token', idToken);
  localStorage.setItem('expires_at', expiresAt);
  localStorage.setItem('user_id', idTokenPayload.sub);
  localStorage.setItem('summoner', summoner);
  localStorage.setItem('summonerId', summonerId);
  localStorage.setItem('regionId', regionId);
  // navigate to the home route
  routerHistory.replace('/entry');
  return {
    userId,
    summoner,
    summonerId,
    regionId,
  };
}

export function login() {
  authService.authorize();
}

export function handleAuthentication() {
  authService.parseHash((err, authResult) => {
    console.log(authResult);
    if (authResult && authResult.accessToken && authResult.idToken) {
      const { userId, summoner, summonerId, regionId } = setSession(authResult);
      getStore().dispatch(setAuth(userId, summoner, summonerId, regionId));
      routerHistory.replace('/entry');
    } else if (err) {
      routerHistory.replace('/entry');
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    }
  });
}

export function logout() {
  // Clear access token and ID token from local storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('summoner');
  localStorage.removeItem('summonerId');
  localStorage.removeItem('regionId');
  // navigate to the home route
  routerHistory.replace('/entry');
}
