import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import EntryListContainer from './EntryListPanel/Container';
import EntryDetailContainer from './EntryDetail/View/Container';
import EntryDetailEditContainer from './EntryDetail/Edit/Container';
import RecentGamesPanelContainer from './RecentGamesPanel/Container';
import { isAuthenticated, login, handleAuthentication } from '../Auth';
import { entriesByUserQuery } from '../api/entry';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 220px auto 170px;
`;

const Entry = ({ match, userId, data }) => {
  if (!isAuthenticated()) {
    login();
    return <div>Redirecting to login...</div>;
  }
  const { loading, entriesByUser } = data;
  if (loading) {
    return <div>Finding entries and recent games...</div>;
  }
  return (
    <MainCont>
      <Route
        path={`${match.url}/:entryId?`}
        render={(props) => (
          <EntryListContainer
            {...props}
            userId={userId}
            isLoadingEntries={loading}
            entries={entriesByUser}
          />
        )}
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
      <RecentGamesPanelContainer
        userId={userId}
        isLoadingEntries={loading}
        entries={entriesByUser}
      />
    </MainCont>
  );
};

Entry.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  userId: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
};

Entry.defaultProps = {
  data: {
    loading: true,
    entriesByUser: null,
  },
};

export default compose(
  connect(
    ({ auth }) => ({
      userId: auth.userId,
    }),
    null,
  ),
  graphql(entriesByUserQuery, {
    skip: (ownProps) => !ownProps.userId || ownProps.userId === '',
    options: (props) => ({ variables: { user: props.userId } }),
  }),
)(Entry);

// export default Entry;
