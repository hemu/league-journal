import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { actions, track } from 'react-redux-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreepScore from './subcomponents/CreepScore';
// import SecondaryList from './subcomponents/SecondaryList';
import Header from './subcomponents/Header';
// import MarkableList from './subcomponents/MarkableList';
import MainLesson from './subcomponents/MainLesson';
import NoteList from './subcomponents/Mistake/NoteList';
import { SystemNoteTypeIds, HARDCODED_USER_ID } from '../../../const';
import { GenericErrorBoundary } from '../../../Error';

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

class EntryDetail extends React.Component {
  constructor(props) {
    super(props);
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
    const { entry, entryLoading, mistakes, lessons, createNote } = props;
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
            <GenericErrorBoundary>
              <MainCard fluid raised>
                <CardHeader>Mistakes</CardHeader>
                <CardContent>
                  <NoteList
                    notes={mistakes}
                    placeholderSuffix="mistake was..."
                    onChange={this.changeNote}
                    createFormModel={(id) =>
                      track(
                        `forms.entryNote[${SystemNoteTypeIds.Mistake}][].text`,
                        {
                          id,
                        },
                      )
                    }
                    onAddNote={() =>
                      createNote(
                        entry.id,
                        HARDCODED_USER_ID,
                        false,
                        '',
                        SystemNoteTypeIds.Mistake,
                      )
                    }
                  />
                </CardContent>
              </MainCard>
            </GenericErrorBoundary>
          </Grid.Column>
          <Grid.Column>
            <GenericErrorBoundary>
              <MainCard fluid raised>
                <CardHeader>Creep Score</CardHeader>
                <CardContent>
                  <CreepScore creepScore={entry.cs} />
                </CardContent>
              </MainCard>
            </GenericErrorBoundary>
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
