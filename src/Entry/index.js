import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import EntryListContainer from './EntryListPanel/Container';
import EntryDetailContainer from './EntryDetail/View/Container';
import RecentGamesPanelContainer from './RecentGamesPanel/Container';
import { isAuthenticated, login, handleAuthentication } from '../Auth';
import { entriesByUserQuery } from '../api/entry';
import ErrorDisplay from '../Error/ErrorDisplay';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 220px auto 170px;
  height: 100%;
`;

export const Entry = ({ match, userId, data }) => {
  if (!isAuthenticated()) {
    login();
    return <ErrorDisplay fontSize={20}>Redirecting to login...</ErrorDisplay>;
  }
  const { loading, entriesByUser, error, fetchMore } = data;

  if (data.error) {
    return (
      <ErrorDisplay fontSize={20}>
        Can't contact server to load entries. Are you sure you are connected to
        the internet?
      </ErrorDisplay>
    );
  }

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
            entries={entriesByUser.entries}
            fetchMoreQuery={fetchMore}
            lastEvaluatedKey={
              entriesByUser.lastEvaluatedKey
                ? entriesByUser.lastEvaluatedKey
                : {}
            }
            canLoadMore={entriesByUser.lastEvaluatedKey != null}
          />
        )}
      />
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
      <RecentGamesPanelContainer
        userId={userId}
        isLoadingEntries={loading}
        entries={entriesByUser.entries}
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
    ({ auth, entry }) => ({
      userId: auth.userId,
      // lastEvaluatedKey: entry.lastEvaluatedKey,
    }),
    null,
  ),
  graphql(entriesByUserQuery, {
    skip: (ownProps) => !ownProps.userId || ownProps.userId === '',
    options: (props) => ({
      variables: {
        user: props.userId,
      },
    }),
  }),
)(Entry);
