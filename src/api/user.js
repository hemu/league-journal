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
    // This automatically takes care of refreshing, etc.
    const session = await Auth.currentSession();
    console.log(session);
    if (!session) {
      console.log('No session');
      return null;
    }
    return userFromSession(session);
  } catch (err) {
    console.log(err);
    return null;
  }
};
