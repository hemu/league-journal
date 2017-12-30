import React from 'react';
import { Grid, Card, Button, Accordion, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import CreepScoreView from './components/SubViewCreepScore';
import ListView from './components/SubViewList';
import Header from './components/Header';

const MainCont = styled.div`
  padding: 20px;
`;

const MainCard = styled(Card)`
  height: 100%;
`;

const EditBtn = styled(Button)`
  &&& {
    background-color: #37474f;
  }
`;

class EntryDetail extends React.Component {
  state = { activeIndex: [0] };

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const arrIndex = activeIndex.indexOf(index);
    if (arrIndex !== -1) {
      activeIndex.splice(arrIndex, 1);
    } else {
      activeIndex.push(index);
    }
    this.setState({ activeIndex });
  };
  render() {
    const props = this.props;
    return (
      <MainCont>
        <EditBtn
          icon="write"
          color="black"
          circular
          size="large"
          onClick={() => props.setEditMode(true)}
        />
        <Header {...props} />
        <Grid stackable columns={2}>
          <Grid.Column>
            <MainCard rasied fluid>
              <Card.Header>Mistakes</Card.Header>
              <ul>{props.mistakes.map(mistake => <li>{mistake.text}</li>)}</ul>
            </MainCard>
          </Grid.Column>
          <Grid.Column>
            <MainCard rasied fluid>
              <Card.Header>Lessons</Card.Header>
              <ul>{props.lessons.map(lesson => <li>{lesson.text}</li>)}</ul>
            </MainCard>
          </Grid.Column>
        </Grid>
        <Accordion fluid styled exclusive={false}>
          <Accordion.Title
            active={this.state.activeIndex.includes(0)}
            onClick={this.handleAccordionClick}
            index={0}
          >
            <Icon name="dropdown" />Creep Score
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex.includes(0)}>
            <CreepScoreView
              csReasons={props.csReasons}
              csPerMin={props.csPerMin}
              csAt5Min={props.csAt5Min}
              csAt10Min={props.csAt10Min}
              csAt15Min={props.csAt15Min}
              csAt20Min={props.csAt20Min}
            />
          </Accordion.Content>
          <Accordion.Title
            active={this.state.activeIndex.includes(1)}
            onClick={this.handleAccordionClick}
            index={1}
          >
            <Icon name="dropdown" />Death Reasons
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex.includes(1)}>
            <ListView items={props.deathReasons} />
          </Accordion.Content>
          <Accordion.Title
            active={this.state.activeIndex.includes(2)}
            onClick={this.handleAccordionClick}
            index={2}
          >
            <Icon name="dropdown" />Positives
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex.includes(2)}>
            <ListView items={props.positives} />
          </Accordion.Content>
        </Accordion>
      </MainCont>
    );
  }
}

export default EntryDetail;
