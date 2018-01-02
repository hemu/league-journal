import React from 'react';
import { Grid, Card, Button, Accordion, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import CreepScoreView from './components/SubViewCreepScore';
import ListView from './components/SubViewList';
import Header from './components/Header';
import MarkableList from './components/MarkableList';

const MainCont = styled.div`
  padding: 20px;
`;

const MainCard = styled(Card)`
  height: 100%;
  &&& {
    border-radius: 0;
  }
`;

const CardHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 20px 20px 5px;
`;

const CardContentList = styled.div`
  &&& {
    padding: 10px 20px;
    border-top: none;
  }
`;

const SecondaryCont = styled.div`
  margin-top: 20px;
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
            <MainCard raised fluid>
              <CardHeader>Mistakes</CardHeader>
              <CardContentList>
                <MarkableList items={props.mistakes} />
              </CardContentList>
            </MainCard>
          </Grid.Column>
          <Grid.Column>
            <MainCard raised fluid>
              <CardHeader>Lessons</CardHeader>
              <CardContentList>
                <MarkableList items={props.lessons} />
              </CardContentList>
            </MainCard>
          </Grid.Column>
        </Grid>
        <SecondaryCont>
          <Card fluid raised>
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
          </Card>
        </SecondaryCont>
      </MainCont>
    );
  }
}

export default EntryDetail;
