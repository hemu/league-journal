import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { markMistakeMutation, markedMistakesQuery } from '../api/mistake';

import DashboardItem from './shared/DashboardItem';
import MarkableList from './shared/MarkableList';

export const Mistakes = ({ data, mainColor, markMistake }) =>
  (data.loading ? (
    <div>Loading mistakes...</div>
  ) : (
    <DashboardItem title="Top Mistakes" mainColor={mainColor}>
      <MarkableList items={data.allMistakes} onMark={markMistake} />
    </DashboardItem>
  ));

Mistakes.propTypes = {
  data: PropTypes.shape({ allMistakes: PropTypes.array }).isRequired,
  mainColor: PropTypes.string.isRequired,
  markMistake: PropTypes.func.isRequired,
};

export default compose(
  graphql(markedMistakesQuery),
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
)(Mistakes);
