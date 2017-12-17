import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

import EntryDetailContainer from '../containers/EntryDetailContainer';
import EntryListContainer from '../containers/EntryListContainer';
import RecentGames from './RecentGamesList';

export default () => (
  <Grid columns={2} divided>
    {/* <Grid.Column width={3}>
            <RecentGames />
          </Grid.Column> */}
    <Grid.Column width={4}>
      <EntryListContainer />
    </Grid.Column>
    <Grid.Column width={8}>
      <EntryDetailContainer />
    </Grid.Column>
  </Grid>
);
