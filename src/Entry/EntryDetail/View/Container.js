import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { entryDetailQuery } from '../../../api/entry';
import { markMistakeMutation } from '../../../api/mistake';
import { markLessonMutation } from '../../../api/lesson';

import { setEditMode } from '../../../modules/entry';

import EntryDetail from './EntryDetail';

export default compose(
  graphql(entryDetailQuery, {
    skip: (ownProps) => !ownProps.entryDetailId,
    options: ({ entryDetailId }) => ({
      variables: {
        entryId: entryDetailId,
      },
    }),
  }),
  graphql(markMistakeMutation, {
    props: ({ mutate }) => ({
      markMistake: (id, marked) =>
        mutate({
          variables: {
            id,
            marked,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateMistake: {
              __typename: 'Mistake',
              id,
              marked,
            },
          },
        }),
    }),
  }),
  graphql(markLessonMutation, {
    props: ({ mutate }) => ({
      markLesson: (id, marked) =>
        mutate({
          variables: {
            id,
            marked,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateLesson: {
              __typename: 'Lesson',
              id,
              marked,
            },
          },
        }),
    }),
  }),
  connect(null, (dispatch) => ({
    setEditMode: (isEditMode, entryId) =>
      dispatch(setEditMode(isEditMode, entryId)),
  })),
)(EntryDetail);