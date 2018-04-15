import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Image, Loader } from 'semantic-ui-react';

import EntryListContainer from './EntryListPanel/Container';
import EntryDetailContainer from './EntryDetail/View/Container';
import RecentGamesPanelContainer from './RecentGamesPanel/Container';
import { isAuthenticated, login, handleAuthentication } from '../Auth';
import { entriesByUserQuery } from '../api/entry';
import ErrorDisplay from '../Error/ErrorDisplay';
import WelcomeImage from './soraka_welcome.png';

// Note: current welcome image is placeholder from
// https://wakeuplena.deviantart.com/art/Soraka-Chibi-563468092

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 220px auto 170px;
  height: 100%;
`;

const EmptyMessage = styled.div`
  margin-top: 50px;
  font-size: 20px;
  color: gray;
  div {
    padding: 20px;
    line-height: 30px;
  }
  img {
    width: 300px;
    height: 299px;
  }
`

const EmptyMessageTitle = styled.div`
  margin-top: 10px;
  font-weight: bold;
  font-size: 25px;
  color: gray;
`

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
    return (
        <div>
          <Loader size='massive' active={true} />
        </div>
    )
  }

  const { entriesByUser: { entries, lastEvaluatedKey } } = data;

  if (!loading && (!entries || entries.length === 0)) {
    return (
      <MainCont>
        <div />
        <EmptyMessage>
          <Image src={WelcomeImage}/>
          <EmptyMessageTitle>Hey! You don't have any entries yet.</EmptyMessageTitle>
          <div>Create an entry from your list of recent games to get started.</div>
        </EmptyMessage>
        <RecentGamesPanelContainer
          userId={userId}
          isLoadingEntries={loading}
          entries={entries}
        />
      </MainCont>
    );
  }
  return (
    <MainCont>
      <Route
        path={`${match.url}/:entryId?`}
        render={(props) => (
          <EntryListContainer
            {...props}
            userId={userId}
            entries={entries}
            fetchMoreQuery={fetchMore}
            lastEvaluatedKey={lastEvaluatedKey || {}}
            canLoadMore={lastEvaluatedKey != null}
          />
        )}
      />
      <Route
        path={`${match.url}/:entryId?`}
        render={(props) => <EntryDetailContainer {...props} userId={userId} />}
      />
      <RecentGamesPanelContainer
        userId={userId}
        isLoadingEntries={loading}
        entries={entries}
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
