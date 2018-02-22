import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GenericErrorBoundary } from '../../../../Error';
import { SystemNoteTypeIds } from '../../../../const';

import EditableHeading from './EditableHeading';

const LessonCont = styled.div`
  margin: 20px auto 50px auto;
  width: 70%;
  color: #636262;
  font-size: 17px;
  font-family: 'Lato';
  text-align: center;
  font-weight: bold;
  line-height: 25px;
`;

const MainLesson = ({ noteId, changeNote }) => (
  <GenericErrorBoundary>
    <LessonCont>
      <EditableHeading
        model={`forms.entryNote.${SystemNoteTypeIds.Lesson}[0].text`}
        emptyPlaceholder="My biggest takeaway is..."
        isLatest={false}
        changeAction={(model, value) => changeNote(model, value, noteId)}
      />
    </LessonCont>
  </GenericErrorBoundary>
);

MainLesson.propTypes = {
  noteId: PropTypes.string.isRequired,
  changeNote: PropTypes.func.isRequired,
};

export default connect(
  ({ forms: { entryNote } }) => ({
    noteId: entryNote[SystemNoteTypeIds.Lesson]
      ? entryNote[SystemNoteTypeIds.Lesson][0].id
      : null,
  }),
  null,
)(MainLesson);
