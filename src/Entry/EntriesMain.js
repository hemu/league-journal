import React from "react";
import EditEntryDetail from "./EditEntryDetail";
import EntriesList from "./EntriesList";

import { Grid, Image } from "semantic-ui-react";

class EntriesMain extends React.Component {
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={4}>
            <EntriesList />
          </Grid.Column>
          <Grid.Column width={8}>
            <EditEntryDetail />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default EntriesMain;
