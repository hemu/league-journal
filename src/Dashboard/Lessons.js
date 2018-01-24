import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { markLessonMutation, markedLessonsQuery } from '../api/lesson';

import DashboardItem from './shared/DashboardItem';
import MarkableList from './shared/MarkableList';

export const Lessons = ({ data, mainColor, markLesson }) =>
  (data.loading ? (
    <div>Loading lessons...</div>
  ) : (
    <DashboardItem title="Top Lessons" mainColor={mainColor}>
      <MarkableList items={data.allLessons} onMark={markLesson} />
    </DashboardItem>
  ));

Lessons.propTypes = {
  data: PropTypes.shape({ allLessons: PropTypes.array }).isRequired,
  mainColor: PropTypes.string.isRequired,
  markLesson: PropTypes.func.isRequired,
};

export default compose(
  graphql(markedLessonsQuery),
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
)(Lessons);
