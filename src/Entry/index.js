import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import EntryListContainer from './EntryListPanel/Container';
import EntryDetailContainer from './EntryDetail/View/Container';
import EntryDetailEditContainer from './EntryDetail/Edit/Container';
import RecentGamesPanelContainer from './RecentGamesPanel/Container';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 220px auto 170px;
`;

const Entry = ({ match }) => (
  <MainCont>
    <Route path={`${match.url}/:entryId?`} component={EntryListContainer} />
    <div>
      <Switch>
        <Route
          path={`${match.url}/:entryId/edit`}
          component={EntryDetailEditContainer}
        />
        <Route
          path={`${match.url}/:entryId`}
          component={EntryDetailContainer}
        />
      </Switch>
    </div>
    <RecentGamesPanelContainer />
  </MainCont>
);

Entry.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
};

export default Entry;
