import React from 'react';
import { Grid, Card, Container } from 'semantic-ui-react';
import Goals from './components/Goals';
import Mistakes from './components/Mistakes';

export default () => (
  <Container>
    <Grid stackable>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Goals />
        </Grid.Column>
        <Grid.Column>
          <Mistakes />
        </Grid.Column>
        <Grid.Column>
          <Card raised fluid>
            <Card.Content>
              <Card.Header>Top Lessons</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Card raised fluid>
            <Card.Content>
              <Card.Header>Recent Mistakes</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card raised fluid>
            <Card.Content>
              <Card.Header>Recent Lessons</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Card raised fluid>
            <Card.Content>
              <Card.Header>Recent Games</Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);
