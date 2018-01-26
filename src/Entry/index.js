import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import EntryDetail from './EntryDetail';
import EntryListContainer from './EntryList/Container';
// import RecentGames from './EntryList/RecentGamesList';

import EntryDetailContainer from './EntryDetail/View/Container';
import EntryDetailEditContainer from './EntryDetail/Edit/Container';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 280px auto;
`;

const Entry = ({ match }) => (
  <MainCont>
    <EntryListContainer />
    <div>
      <Route
        path={`${match.url}/:entryId/edit`}
        component={EntryDetailEditContainer}
      />
      <Route path={`${match.url}/:entryId`} component={EntryDetailContainer} />
    </div>
  </MainCont>
);

// Entry.propTypes = {
// match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
// };

export default Entry;
