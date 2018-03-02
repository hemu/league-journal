import React from 'react';
import { lifecycle, withState, compose } from 'recompose';
import { Link } from 'react-router-dom';
import { fetchUser } from '../api/user';

// window.LOG_LEVEL = 'DEBUG';

const LandingPage = compose(
  withState('signedIn', 'setSignedIn', false),
  lifecycle({
    componentDidMount() {
      fetchUser().then((user) => {
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
