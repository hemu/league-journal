import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EntryDetailContainer from './EntryDetailContainer';
import EntryDetailEditContainer from './EntryDetailEditContainer';

const container = (editMode, entryDetailId) => {
  if (editMode) {
    return <EntryDetailEditContainer entryDetailId={entryDetailId} />;
  }
  return <EntryDetailContainer entryDetailId={entryDetailId} />;
};

const EntryDetailSwitch = ({ editMode, entryDetailId }) => {
  if (entryDetailId) {
    return container(editMode, entryDetailId);
  }
  return <div>Choose an entry</div>;
};

EntryDetailSwitch.propTypes = {
  entryDetailId: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default connect(
  ({ entry: { entryDetailId, editMode } }) => ({ entryDetailId, editMode }),
  null,
)(EntryDetailSwitch);
