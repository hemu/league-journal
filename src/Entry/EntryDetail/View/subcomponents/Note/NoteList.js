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
    i {
      margin: 0 10px;
    }
  }
`;

function ordinal(num) {
  let suffix = 'th';
  if (num === 1) suffix = 'st';
  if (num === 2) suffix = 'nd';
  if (num === 3) suffix = 'rd';
  return `${num}${suffix}`;
}

const List = ({
  notes,
  onChange,
  onBlur,
  placeholderSuffix,
  recentlyAdded,
  metaSource,
}) => {
  let editables = notes;

  if (metaSource && metaSource.length >= notes.length) {
    editables = notes.map((note, i) => ({ ...note, meta: metaSource[i] }));
  }

  return editables.map((editable, elemIndex) => (
    <EditableNote
      key={editable.id}
      model={editable.model}
      initWithEditFocus={recentlyAdded && elemIndex === editables.length - 1}
      emptyPlaceholder={`My ${ordinal(elemIndex + 1)} ${placeholderSuffix}`}
      changeAction={(model, value) => onChange(model, value, editable.id)}
      onBlur={onBlur}
      meta={editable.meta}
    />
  ));
};

List.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, model: PropTypes.func }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholderSuffix: PropTypes.string.isRequired,
  recentlyAdded: PropTypes.bool.isRequired,
  metaSource: PropTypes.arrayOf(PropTypes.string),
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
    metaSource,
    btnTextGenerator,
  }) => (
    <div>
      <List
        metaSource={metaSource}
        notes={notes.map((note) => ({
          ...note,
          model: createFormModel(note.id),
        }))}
        onChange={onChange}
        placeholderSuffix={placeholderSuffix}
        recentlyAdded={recentlyAdded}
        onBlur={() => setRecentAdded(false)}
      />
      {notes.length < 5 && (!metaSource || metaSource.length >= notes.length + 1 ) && (
        <AddBtn
          type="button"
          onClick={() => {
            const meta = metaSource ? [metaSource[notes.length]] : [];
            setRecentAdded(true);
            onAddNote(meta);
          }}
          fluid
        >
          {btnTextGenerator(
            metaSource && metaSource.length >= notes.length + 1
              ? metaSource[notes.length]
              : null,
          )}
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
  metaSource: PropTypes.arrayOf(PropTypes.string),
  btnTextGenerator: PropTypes.func.isRequired,
};

export default NoteList;
