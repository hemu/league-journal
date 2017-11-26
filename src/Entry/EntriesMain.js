import React from "react";
import EntryDetailContainer from "./containers/EntryDetailContainer";
import EntryListContainer from "./containers/EntryListContainer";
import RecentGames from "./RecentGamesList";

import { Grid, Image } from "semantic-ui-react";

class EntriesMain extends React.Component {
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          {/* <Grid.Column width={3}>
            <RecentGames />
          </Grid.Column> */}
          <Grid.Column width={3}>
            <EntryListContainer />
          </Grid.Column>
          <Grid.Column width={8}>
            <EntryDetailContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default EntriesMain;
