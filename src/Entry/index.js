import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import EntryListContainer from './EntryList/Container';

import EntryDetailContainer from './EntryDetail/View/Container';
import EntryDetailEditContainer from './EntryDetail/Edit/Container';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 280px auto;
`;

const Entry = ({ match }) => (
  <MainCont>
    <Route path={`${match.url}/:entryId?`} component={EntryListContainer} />
    {/* <EntryListContainer /> */}
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
  </MainCont>
);

Entry.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
};

export default Entry;
