import gql from 'graphql-tag';

export const goalQuery = gql`
  query AllGoalsQuery {
    allGoals {
      id
      text
    }
  }
`;

export const saveGoalMutation = gql`
  mutation SaveGoal($id: ID!, $text: String!) {
    updateGoal(id: $id, text: $text) {
      id
      text
    }
  }
`;
