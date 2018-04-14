import React from 'react';
import { Grid, Card, Input, Embed } from 'semantic-ui-react';
import { actions, track, Control } from 'react-redux-form';
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
import { entryDetailColors } from '../../../const/colors';

const MainCont = styled.div`
  padding: 20px;
`;

const MainCard = styled.div`
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  /* justify-content: center; */
  grid-template-columns: 150px auto;
  &&& {
    /* border-radius: 0; */
    margin-bottom: 15px;
  }
`;

const CardHeader = styled.div`
  font-size: 20px;
  color: ${entryDetailColors.header};
  font-weight: 600;
  padding: 20px 20px 5px;
  text-align: center;
`;

const FullWidthInput = styled(Input)`
  width: 100%;
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

    // XXX: This is a quick fix... refactor how video url gets loaded into form.
    // load video url
    if (
      (!this.props.entry && nextProps.entry) ||
      (this.props.entry &&
        nextProps.entry &&
        this.props.entry.video !== nextProps.entry.video)
    ) {
      this.props.setVideoForm(nextProps.entry.video);
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
      updateEntryVideo,
      videoUrl,
    } = props;
    const isLoading = entryLoading;
    if (error) {
      return <div>{error}</div>;
    }
    if (!entry) {
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

    const videoChangeHandler = (model, value) => (dispatch) => {
      dispatch(actions.change(model, value));
      updateEntryVideo(entry.id, entry.gameDate, value);
    };

    const videoIdMatches = videoUrl
      ? videoUrl.match(
        /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
      )
      : null;
    const videoId =
      videoIdMatches && videoIdMatches.length > 0 ? videoIdMatches[1] : null;

    return (
      <MainCont>
        <Header {...entry} />
        {videoId && (
          <Grid.Column>
            <Embed id={videoId} source="youtube" autoplay />
          </Grid.Column>
        )}
        <MainLesson changeNote={noteChangeHandler} />
        <Grid centered columns={1}>
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
                <CardHeader>CS</CardHeader>
                <CardContent>
                  <CreepScore creepScore={entry.cs} />
                </CardContent>
              </MainCard>
            </GenericErrorBoundary>
          </Grid.Column>
          <Grid.Column>
            <GenericErrorBoundary>
              <MainCard fluid raised>
                <CardHeader>YouTube</CardHeader>
                <CardContent>
                  <Control.text
                    component={FullWidthInput}
                    changeAction={videoChangeHandler}
                    model="forms.entry.video"
                    placeholder="https://www.youtube.com/watch?v=whJ5iwc6pts"
                    updateOn="blur"
                  />
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
  entry: PropTypes.shape({ id: PropTypes.string, video: PropTypes.string }),
  entryId: PropTypes.string,
  entryLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchNotes: PropTypes.func.isRequired,
  lessons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mistakes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  notesLoading: PropTypes.bool.isRequired,
  updateNoteText: PropTypes.func.isRequired,
  updateEntryVideo: PropTypes.func.isRequired,
  setVideoForm: PropTypes.func.isRequired,
  videoUrl: PropTypes.func.isRequired,
};

EntryDetail.defaultProps = {
  entry: null,
  entryId: null,
  error: null,
};

export default EntryDetail;
