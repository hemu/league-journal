import React from 'react';
import { Grid, Card, Button, Accordion, Icon } from 'semantic-ui-react';
import { actions, track } from 'react-redux-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreepScore from './subcomponents/CreepScore';
import SecondaryList from './subcomponents/SecondaryList';
import Header from './subcomponents/Header';
import MarkableList from './subcomponents/MarkableList';
import MainLesson from './subcomponents/MainLesson';
import EditableNote from './subcomponents/EditableNote';
import { SystemNoteTypeIds, HARDCODED_USER_ID } from '../../../const';

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
  font-size: 16px;
  font-weight: 600;
  padding: 20px 20px 5px;
  text-align: center;
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

const AddBtn = styled(Button)`
  &&& {
    color: #aaa;
    background-color: #fff;
    border: 3px dashed #f0f0f0;
    margin-top: 5px;
  }
`;

function ordinal(num) {
  let suffix = 'th';
  if (num === 1) suffix = 'st';
  if (num === 2) suffix = 'nd';
  if (num === 3) suffix = 'rd';
  return `${num}${suffix}`;
}

class EntryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: [0] };
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
    this.changeNote = this.changeNote.bind(this);
  }

  componentDidMount() {
    const { notesLoading, entryId } = this.props;
    if (notesLoading === false && entryId) {
      this.props.fetchNotes(entryId);
    }
  }

  componentWillReceiveProps(nextProps) {
    // XXX: This seems bad... refactor this and change how notes
    // are properly loaded into form
    const switchToNewEntry =
      this.props.notesLoading && !nextProps.notesLoading && nextProps.entryId;

    const switchToPrevEntry =
      !this.props.notesLoading &&
      !nextProps.notesLoading &&
      this.props.entryId !== nextProps.entryId;

    if (switchToNewEntry || switchToPrevEntry) {
      this.props.fetchNotes(nextProps.entryId);
    }
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

  changeNote(model, value, noteId) {
    return (dispatch) => {
      dispatch(actions.change(model, value));
      if (!value || !value.trim()) {
        this.props.deleteNote(noteId, this.props.entry.id);
      } else {
        this.props.updateNoteText(noteId, this.props.entry.id, value);
      }
    };
  }

  render() {
    const { props } = this;
    const {
      entry,
      entryLoading,
      mistakes,
      lessons,
      // notesLoading,
      createNote,
    } = props;
    const isLoading = entryLoading;
    if (!entry || !mistakes || !lessons) {
      return <div>Error contacting server.</div>;
    }
    if (isLoading) {
      return <div>Loading entry...</div>;
    }

    const onNoteMark = (id, marked) => props.markNote(id, entry.id, marked);

    return (
      <MainCont>
        <Header {...entry} />
        <MainLesson changeNote={this.changeNote} />
        <Grid stackable centered columns={2}>
          <Grid.Column>
            <MainCard fluid raised>
              <CardHeader>Mistakes</CardHeader>
              <CardContent>
                {mistakes.map((mistake, elemIndex) => (
                  <EditableNote
                    key={mistake.id}
                    model={track(
                      `forms.entryNote[${SystemNoteTypeIds.Mistake}][].text`,
                      { id: mistake.id },
                    )}
                    isLatest={false}
                    emptyPlaceholder={`My ${ordinal(
                      elemIndex + 1,
                    )} mistake was...`}
                    changeAction={(model, value) =>
                      this.changeNote(model, value, mistake.id)
                    }
                  />
                ))}
                {mistakes.length < 5 ? (
                  <AddBtn
                    type="button"
                    onClick={() =>
                      createNote(
                        entry.id,
                        HARDCODED_USER_ID,
                        false,
                        '',
                        SystemNoteTypeIds.Mistake,
                      )
                    }
                    fluid
                  >
                    <Icon name="add" />ADD MISTAKE
                  </AddBtn>
                ) : (
                  ''
                )}

                {/* <MarkableList
              items={mistakes}
              onMark={onNoteMark}
              parentModel="entryForm"
              model="mistakes"
            /> */}
              </CardContent>
            </MainCard>
          </Grid.Column>
          <Grid.Column>
            <MainCard fluid raised>
              <CardHeader>Creep Score</CardHeader>
              <CardContent>
                <CreepScore creepScore={entry.cs} />
              </CardContent>
            </MainCard>
          </Grid.Column>
        </Grid>
      </MainCont>
    );
  }
}

EntryDetail.propTypes = {
  entry: PropTypes.shape({ id: PropTypes.string }),
  entryId: PropTypes.string,
  fetchNotes: PropTypes.func.isRequired,
  mistakes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lessons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  entryLoading: PropTypes.bool.isRequired,
  notesLoading: PropTypes.bool.isRequired,
  markNote: PropTypes.func.isRequired,
  updateNoteText: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

EntryDetail.defaultProps = {
  entry: null,
  entryId: null,
};

export default EntryDetail;
