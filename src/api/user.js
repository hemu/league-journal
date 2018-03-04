import { Auth } from 'aws-amplify';

export function isAuthed(authState) {
  return authState === 'signedIn';
}

export const userAttrMap = {
  summonerName: 'custom:summoner-name',
  summonerId: 'custom:summoner-id',
  userId: 'sub',
};

function userFromSession(session) {
  if (!session.idToken || !session.idToken.payload) return null;
  const { idToken: { payload } } = session;
  return {
    summonerName: payload[userAttrMap.summonerName],
    summonerId: payload[userAttrMap.summonerId],
    userId: payload[userAttrMap.userId],
  };
}

export function userFromCognitoUser(cognitoUser) {
  if (!cognitoUser || !cognitoUser.signInUserSession) return null;
  return userFromSession(cognitoUser.signInUserSession);
}

export const fetchUser = async () => {
  try {
    const session = await Auth.currentSession();
    // const user = await Auth.currentAuthenticatedUser();
    // const userCred = await Auth.currentUserCredentials();
    // const essentialCred = await Auth.essentialCredentials(userCred);
    if (!session) return null;
    return userFromSession(session);
  } catch (err) {
    console.log(err);
    return null;
  }
};
