import React from 'react';
import { connect } from 'react-redux';

import EntryDetailContainer from './EntryDetailContainer';
import EntryDetailEditContainer from './EntryDetailEditContainer';

const EntryDetailSwitch = ({ entryDetailId, editMode }) =>
  (entryDetailId ? (
    editMode ? (
      <EntryDetailEditContainer entryDetailId={entryDetailId} />
    ) : (
      <EntryDetailContainer entryDetailId={entryDetailId} />
    )
  ) : (
    <div>Choose an entry</div>
  ));

export default connect(
  ({ entry: { entryDetailId, editMode } }) => ({ entryDetailId, editMode }),
  null,
)(EntryDetailSwitch);
