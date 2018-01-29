import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { graphql, compose } from 'react-apollo';
import { latestNotesQuery } from '../../api/notes';
import { markMistakeMutation, markedMistakesQuery } from '../../api/mistake';
import { markLessonMutation, markedLessonsQuery } from '../../api/lesson';
import LatestNotes from './LatestNotes';

function setupNotes(mistakes, lessons, markMistake, markLesson) {
  const notes = [
    ...mistakes.map((mistake) => ({
      ...mistake,
      gameDate: new Date(mistake.gameDate),
      entry: mistake.entry || {
        champion: 'Unknown',
        opponentChampion: 'Unknown',
        gameDate: new Date(),
      },
      onMark: markMistake,
    })),
    ...lessons.map((lesson) => ({
      ...lesson,
      gameDate: new Date(lesson.gameDate),
      onMark: markLesson,
      entry: lesson.entry || {
        champion: 'Unknown',
        opponentChampion: 'Unknown',
        gameDate: new Date(),
      },
    })),
  ];
  return orderBy(notes, ['createdAt'], ['desc']).slice(0, 10);
}

export const Notes = ({ data, mainColor, markMistake, markLesson }) =>
  (data.loading ? (
    <div>Loading latest notes...</div>
  ) : (
    <LatestNotes
      mainColor={mainColor}
      notes={setupNotes(
        data.allMistakes,
        data.allLessons,
        markMistake,
        markLesson,
      )}
    />
  ));

Notes.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    allMistakes: PropTypes.array,
    allLessons: PropTypes.array,
  }).isRequired,
  mainColor: PropTypes.string.isRequired,
  markMistake: PropTypes.func.isRequired,
  markLesson: PropTypes.func.isRequired,
};

export default compose(
  graphql(latestNotesQuery),
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
          update: (proxy, { data: { updateMistake } }) => {
            // Read the data from our cache for this query.
            if (updateMistake.marked) {
              const data = proxy.readQuery({
                query: markedMistakesQuery,
                // variables: { entryId },
              });
              // Add our comment from the mutation to the end.
              data.allMistakes.unshift(updateMistake);
              // Write our data back to the cache.
              proxy.writeQuery({
                query: markedMistakesQuery,
                data,
              });
            }
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
          update: (proxy, { data: { updateLesson } }) => {
            // Read the data from our cache for this query.
            if (updateLesson.marked) {
              const data = proxy.readQuery({
                query: markedLessonsQuery,
                // variables: { entryId },
              });
              // Add our comment from the mutation to the end.
              data.allLessons.unshift(updateLesson);
              // Write our data back to the cache.
              proxy.writeQuery({
                query: markedLessonsQuery,
                data,
              });
            }
          },
        }),
    }),
  }),
  connect(),
)(Notes);
