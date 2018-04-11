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

function createChangeNoteHandler(entryId, updateNoteText, deleteNote) {
  return (model, value, noteId) => (dispatch) => {
    dispatch(actions.change(model, value));
    if (!value || !value.trim()) {
      deleteNote(noteId, entryId);
    } else {
      updateNoteText(noteId, entryId, value);
    }
  };
}

class EntryDetail extends React.Component {
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

  render() {
    const { props } = this;
    const {
      createNote,
      deleteNote,
      entry,
      entryLoading,
      error,
      lessons,
      mistakes,
      updateNoteText,
    } = props;
    const isLoading = entryLoading;
    if (error) {
      return <div>{error}</div>;
    }
    if(!entry) {
      return <div>Choose an entry</div>;
    }

    if (isLoading) {
      return <div>Loading entry...</div>;
    }

    const noteChangeHandler = createChangeNoteHandler(
      entry.id,
      updateNoteText,
      deleteNote,
    );

    return (
      <MainCont>
        <Header {...entry} />
        <MainLesson changeNote={noteChangeHandler} />
        <Grid stackable centered columns={2}>
          <Grid.Column>
            <GenericErrorBoundary>
              <MainCard fluid raised>
                <CardHeader>Mistakes</CardHeader>
                <CardContent>
                  <NoteList
                    notes={mistakes}
                    placeholderSuffix="mistake was..."
                    onChange={noteChangeHandler}
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
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  entry: PropTypes.shape({ id: PropTypes.string }),
  entryId: PropTypes.string,
  entryLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchNotes: PropTypes.func.isRequired,
  lessons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mistakes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  notesLoading: PropTypes.bool.isRequired,
  updateNoteText: PropTypes.func.isRequired,
};

EntryDetail.defaultProps = {
  entry: null,
  entryId: null,
  error: null,
};

export default EntryDetail;
