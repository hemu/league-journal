import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import EditableNote from './EditableNote';

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

const List = ({ notes, placeholderSuffix, onChange }) =>
  (notes.length > 0 ? (
    notes.map((note, elemIndex) => (
      <EditableNote
        key={note.id}
        model={note.model}
        isLatest={false}
        emptyPlaceholder={`My ${ordinal(elemIndex + 1)} ${placeholderSuffix}`}
        changeAction={(model, value) => onChange(model, value, note.id)}
      />
    ))
  ) : (
    <div>No mistakes yet...</div>
  ));

List.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, model: PropTypes.func }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholderSuffix: PropTypes.string.isRequired,
};

const NoteList = ({
  notes,
  placeholderSuffix,
  onChange,
  onAddNote,
  createFormModel,
}) => (
  <div>
    <List
      notes={notes.map((note) => ({
        ...note,
        model: createFormModel(note.id),
      }))}
      onChange={onChange}
      placeholderSuffix={placeholderSuffix}
    />
    {notes.length < 5 ? (
      <AddBtn type="button" onClick={onAddNote} fluid>
        <Icon name="add" />ADD MISTAKE
      </AddBtn>
    ) : (
      <div>No add button</div>
    )}
  </div>
);

NoteList.propTypes = {
  createFormModel: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string }))
    .isRequired,
  onChange: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
  placeholderSuffix: PropTypes.string.isRequired,
};

export default NoteList;
