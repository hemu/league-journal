import gql from "graphql-tag";

export const allEntriesQuery = gql`
  query AllEntriesQuery {
    allEntries {
      id
    }
  }
`;
