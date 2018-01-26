import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import EntryDetailContainer from './View/Container';
import EntryDetailEditContainer from './Edit/Container';

// const container = (editMode) => {
// if (editMode) {
//   return <EntryDetailEditContainer entryId={entryId} />;
// }
// return <EntryDetailContainer entryId={entryId} />;
// };

// const EntryDetailSwitch = ({ editMode, entryId }) => {
//   if (entryId) {
//     return container(editMode, entryId);
//   }
//   return <div>Choose an entry</div>;
// };

// EntryDetailSwitch.propTypes = {
//   // entryDetailId: PropTypes.string.isRequired,
//   entryId: PropTypes.string.isRequired,
//   editMode: PropTypes.bool.isRequired,
// };

// export default connect(
//   // ({ entry: { entryDetailId, editMode } }) => ({ entryDetailId, editMode }),
//   ({ entry: { editMode } }) => ({ editMode }),
//   null,
// )(EntryDetailSwitch);

export default ({ match }) => (
  <Route path={`${match.url}/:entryId`} component={EntryDetailContainer} />
);
