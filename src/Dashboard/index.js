import React from 'react';
import { Grid, Card, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import GoalContainer from './Goal';
import Mistakes from './Mistakes';
import Lessons from './Lessons';
import RecentGames from './RecentGames';
import LatestNotes from './LatestNotes';
import { grayBlue } from '../const/colors';

const Cont = styled.div`
  background-color: #eaeaea;
  padding: 20px;
`;

export default () => (
  <Cont>
    <GoalContainer />
    <Grid stackable>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Mistakes mainColor="#EB5783" />
        </Grid.Column>
        <Grid.Column>
          <Lessons mainColor="#C46AE5" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <RecentGames mainColor={grayBlue} />
        </Grid.Column>
        <Grid.Column>
          <LatestNotes mainColor={grayBlue} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Cont>
);
