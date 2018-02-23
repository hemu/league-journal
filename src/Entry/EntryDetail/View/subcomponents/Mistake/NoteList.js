import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import { withState } from 'recompose';
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

const List = ({ notes, onChange, placeholderSuffix, recentlyAdded }) =>
  (notes.length > 0 ? (
    notes.map((note, elemIndex) => (
      <EditableNote
        key={note.id}
        model={note.model}
        initWithEditFocus={recentlyAdded && elemIndex === notes.length - 1}
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
  recentlyAdded: PropTypes.bool.isRequired,
};

const enhance = withState('recentlyAdded', 'setRecentAdded', false);
const NoteList = enhance(
  ({
    createFormModel,
    notes,
    onAddNote,
    onChange,
    placeholderSuffix,
    recentlyAdded,
    setRecentAdded,
  }) => (
    <div>
      <List
        notes={notes.map((note) => ({
          ...note,
          model: createFormModel(note.id),
        }))}
        onChange={onChange}
        placeholderSuffix={placeholderSuffix}
        recentlyAdded={recentlyAdded}
      />
      {notes.length < 5 && (
        <AddBtn
          type="button"
          onClick={() => {
            setRecentAdded(true);
            onAddNote();
          }}
          fluid
        >
          <Icon name="add" />ADD MISTAKE
        </AddBtn>
      )}
    </div>
  ),
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
