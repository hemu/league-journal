import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { lifecycle } from 'recompose';
import EntryList from './EntryList';
import { setEntryDetailId as _setEntryDetailId } from '../../modules/entry';
import { entriesByUserQuery } from '../../api/entry';

const EntryListContainer = lifecycle({
  componentDidMount() {
    if (!this.props.data.loading && !this.props.match.params.entryId) {
      const { data: { entriesByUser }, setEntryDetailId } = this.props;
      if (entriesByUser && entriesByUser.length > 0) {
        setEntryDetailId(entriesByUser[0].id);
      }
    }
  },
  componentWillReceiveProps(nextProps) {
    // if going from loading to done loading,
    // and no current selectedId, set default detail entry to first entry
    if (
      this.props.data.loading &&
      !nextProps.data.loading &&
      !nextProps.match.params.entryId
    ) {
      const { data: { entriesByUser }, setEntryDetailId } = nextProps;
      if (entriesByUser && entriesByUser.length > 0) {
        setEntryDetailId(entriesByUser[0].id);
      }
    }
  },
})(
  ({
    data: { loading, entriesByUser },
    setEntryDetailId,
    createEntry,
    match,
  }) => {
    if (loading) {
      return <div>Finding entries...</div>;
    }

    return (
      <EntryList
        entries={entriesByUser}
        onSelectEntry={setEntryDetailId}
        createEntry={createEntry}
        selectedId={match.params.entryId || ''}
      />
    );
  },
);

EntryListContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  setEntryDetailId: PropTypes.func.isRequired,
};

export default compose(
  graphql(entriesByUserQuery, {
    // options: { variables: { user: HARDCODED_USER_ID } },
    skip: ({ user }) => !user.userId,
    options: ({ user }) => ({ variables: { user: user.userId } }),
    // options: ({ user }) => ({ variables: { user: 'none' } })
  }),
  connect(null, (dispatch) => ({
    setEntryDetailId: (entryId) => dispatch(_setEntryDetailId(entryId)),
  })),
)(EntryListContainer);
