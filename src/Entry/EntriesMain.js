import React from "react";
import EntryDetail from "./EntryDetail";
import EntriesList from "./EntriesList";
import RecentGames from "./RecentGamesList";

import { Grid, Image } from "semantic-ui-react";

class EntriesMain extends React.Component {
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={3}>
            <RecentGames />
          </Grid.Column>
          <Grid.Column width={3}>
            <EntriesList />
          </Grid.Column>
          <Grid.Column width={8}>
            <EntryDetail />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default EntriesMain;
