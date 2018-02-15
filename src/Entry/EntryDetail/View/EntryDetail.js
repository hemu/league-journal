import React from 'react';
import { Grid, Card, Button, Accordion, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreepScore from './CreepScore';
import SecondaryList from './SecondaryList';
import Header from './Header';
import MarkableList from './MarkableList';

const MainCont = styled.div`
  padding: 20px;
`;

const MainCard = styled(Card)`
  height: 100%;
  &&& {
    border-radius: 0;
    margin-bottom: 15px;
  }
`;

const CardHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 20px 20px 5px;
`;

const CardContent = styled.div`
  &&& {
    padding: 10px 20px;
    border-top: none;
  }
`;

const EditBtn = styled(Button)`
  &&& {
    background-color: #37474f;
  }
`;

class EntryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: [0] };
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
  }

  handleAccordionClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const arrIndex = activeIndex.indexOf(index);
    if (arrIndex !== -1) {
      activeIndex.splice(arrIndex, 1);
    } else {
      activeIndex.push(index);
    }
    this.setState({ activeIndex });
  }

  render() {
    const { props } = this;
    const { entry, entryLoading, mistakes, lessons, notesLoading } = props;
    const isLoading = entryLoading || notesLoading;
    if (!entry || !mistakes || !lessons) {
      return <div>Error contacting server.</div>;
    }
    if (isLoading) {
      return <div>Loading entry...</div>;
    }

    const onNoteMark = (id, marked) => props.markNote(id, entry.id, marked);

    return (
      <MainCont>
        <EditBtn
          icon="write"
          color="black"
          circular
          size="large"
          onClick={() => props.setEditMode(true, entry.id)}
        />
        <Header {...entry} />
        <Grid stackable columns={2}>
          <Grid.Column>
            <MainCard raised fluid>
              <CardHeader>Mistakes</CardHeader>
              <CardContent>
                <MarkableList items={mistakes} onMark={onNoteMark} />
              </CardContent>
            </MainCard>
          </Grid.Column>
          <Grid.Column>
            <MainCard raised fluid>
              <CardHeader>Lessons</CardHeader>
              <CardContent>
                <MarkableList items={lessons} onMark={onNoteMark} />
              </CardContent>
            </MainCard>
          </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              <MainCard fluid raised>
                <CardHeader>Creep Score</CardHeader>
                <CardContent>
                  <CreepScore creepScore={entry.cs} />
                </CardContent>
              </MainCard>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </MainCont>
    );
  }
}

EntryDetail.propTypes = {
  entry: PropTypes.shape({ id: PropTypes.string }).isRequired,
  mistakes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lessons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  entryLoading: PropTypes.bool.isRequired,
  notesLoading: PropTypes.bool.isRequired,
  markNote: PropTypes.func.isRequired,
  updateNoteText: PropTypes.func.isRequired,
};

export default EntryDetail;
