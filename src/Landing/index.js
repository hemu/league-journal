import React from 'react';
import { lifecycle, withState, compose } from 'recompose';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

// window.LOG_LEVEL = 'DEBUG';

const currentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    // const userInfo = await Auth.currentUserInfo();
    // const userCred = await Auth.currentUserCredentials();
    // const essentialCred = await Auth.essentialCredentials(userCred);
    const userSession = await Auth.currentSession();
    // console.log(userSession.idToken.payload.sub);
    console.log(userSession.accessToken);
    // return [user, userInfo, userCred];
    return [user, userSession];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const LandingPage = compose(
  withState('signedIn', 'setSignedIn', false),
  lifecycle({
    componentDidMount() {
      currentUser().then((user) => {
        console.log(user);
        if (user != null) {
          this.setState({
            signedIn: true,
          });
        }
      });
    },
  }),
)(({ signedIn }) => (
  <div>
    <h1>League Journal</h1>
    <div>{!signedIn && <Link to="/entry">Login / Sign Up</Link>}</div>
  </div>
));

// const enhance = withState('recentlyAdded', 'setRecentAdded', false);
// const WithAuth = () =>
//   enhance(<LandingPage signedIn={currentUser() != null} />);

export default LandingPage;
