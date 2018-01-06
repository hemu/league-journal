import React from 'react';
import styled from 'styled-components';

import EntryDetailSwitch from '../containers/EntryDetailSwitch';
import EntryListContainer from '../containers/EntryListContainer';
// import RecentGames from './RecentGamesList';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 280px auto;
`;

export default () => (
  <MainCont>
    <EntryListContainer />
    <EntryDetailSwitch />
  </MainCont>
);
