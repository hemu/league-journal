import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import EntryListContainer from './EntryListPanel/Container';
import EntryDetailContainer from './EntryDetail/View/Container';
// import EntryDetailEditContainer from './EntryDetail/Edit/Container';
import RecentGamesPanelContainer from './RecentGamesPanel/Container';

import { userFromCognitoUser, isAuthed } from '../api/user';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 220px auto 170px;
`;

const Entry = ({ match, authData, authState }) => {
  if (!isAuthed(authState)) {
    return <div>Need to be signed in to view this page</div>;
  }

  const user = userFromCognitoUser(authData);
  return (
    <MainCont>
      <Route
        path={`${match.url}/:entryId?`}
        render={(props) => <EntryListContainer user={user} {...props} />}
      />
      <Route
        path={`${match.url}/:entryId`}
        render={(props) => <EntryDetailContainer user={user} {...props} />}
      />
      <RecentGamesPanelContainer user={user} />
    </MainCont>
  );
};

Entry.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  authData: PropTypes.shape({
    signInUserSession: PropTypes.shape({
      idToken: PropTypes.shape({
        jwtToken: PropTypes.string,
        payload: PropTypes.shape({}),
      }),
    }),
  }).isRequired,
  authState: PropTypes.string.isRequired,
};

export default Entry;
