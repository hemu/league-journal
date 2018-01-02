import React from 'react';
import styled from 'styled-components';

import EntryDetailContainer from '../containers/EntryDetailContainer';
import EntryListContainer from '../containers/EntryListContainer';
import RecentGames from './RecentGamesList';

const MainCont = styled.div`
  display: grid;
  grid-template-columns: 280px auto;
`;

export default () => (
  <MainCont>
    <EntryListContainer />
    <EntryDetailContainer />
  </MainCont>
  // <Grid columns={2} divided padded="horizontally" stackable={false}>
  //   {/* <Grid.Column width={3}>
  //           <RecentGames />
  //         </Grid.Column> */}
  //   <SideBar width={4}>
  //     <EntryListContainer />
  //   </SideBar>
  //   <Grid.Column width={12}>
  //     <EntryDetailContainer />
  //   </Grid.Column>
  // </Grid>
);
