import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import EntryListContainer from './EntryListPanel/Container';
import EntryDetailContainer from './EntryDetail/View/Container';
import EntryDetailEditContainer from './EntryDetail/Edit/Container';
import RecentGamesPanelContainer from './RecentGamesPanel/Container';
import { isAuthenticated, login, handleAuthentication } from '../Auth';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 220px auto 170px;
`;

const Entry = ({ match, auth, userId }) => {
  if (!isAuthenticated()) {
    login();
    return <div>Redirecting to login...</div>;
  }
  return (
    <MainCont>
      <Route
        path={`${match.url}/:entryId?`}
        render={(props) => <EntryListContainer {...props} userId={userId} />}
      />
      <div>
        <Switch>
          <Route
            path={`${match.url}/:entryId/edit`}
            render={(props) => (
              <EntryDetailContainer {...props} userId={userId} />
            )}
          />
          <Route
            path={`${match.url}/:entryId`}
            render={(props) => (
              <EntryDetailContainer {...props} userId={userId} />
            )}
          />
        </Switch>
      </div>
      <RecentGamesPanelContainer />
    </MainCont>
  );
};

Entry.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  auth: PropTypes.shape({}).isRequired,
};

export default connect(
  ({ auth }) => ({
    userId: auth.userId,
  }),
  null,
)(Entry);

// export default Entry;
