import React from 'react';
import styled from 'styled-components';

import EntryDetail from './EntryDetail';
import EntryListContainer from './EntryList/Container';
// import RecentGames from './EntryList/RecentGamesList';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 280px auto;
`;

export default () => (
  <MainCont>
    <EntryListContainer />
    <EntryDetail />
  </MainCont>
);
