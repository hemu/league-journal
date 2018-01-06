import React from 'react';
import { connect } from 'react-redux';

import EntryDetailContainer from './EntryDetailContainer';

const EntryDetailSwitch = ({ entryDetailId }) =>
  (entryDetailId ? (
    <EntryDetailContainer entryDetailId={entryDetailId} />
  ) : (
    <div>Choose an entry</div>
  ));

export default connect(
  ({ entry: { entryDetailId } }) => ({ entryDetailId }),
  null,
)(EntryDetailSwitch);
