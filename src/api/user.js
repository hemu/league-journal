import { Auth } from 'aws-amplify';

export const userAttrMap = {
  summonerName: 'custom:summoner-name',
  summonerId: 'custom:summoner-id',
  userId: 'sub',
};

export const fetchUser = async () => {
  try {
    const session = await Auth.currentSession();
    // const user = await Auth.currentAuthenticatedUser();
    // const userCred = await Auth.currentUserCredentials();
    // const essentialCred = await Auth.essentialCredentials(userCred);
    if (!session || !session.idToken || !session.idToken.payload) return null;
    const { idToken: { payload } } = session;
    return {
      summonerName: payload[userAttrMap.summonerName],
      summonerId: payload[userAttrMap.summonerId],
      userId: payload[userAttrMap.userId],
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
