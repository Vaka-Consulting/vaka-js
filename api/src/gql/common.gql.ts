/**
 * Common Graphql scalars and types
 */

import gql from "graphql-tag";

export const commonTypeDefs = gql`
  scalar GraphQLObjectId
  scalar DateTime
  scalar JSON
  scalar JSONObject

  enum OperationType {
    EQUALS
    NOT_EQUALS
    GREATER_THAN
    GREATER_THAN_EQUALS
    LESS_THAN
    LESS_THAN_EQUALS
    IN
    NOT_IN
    REGEX_MATCH
    SEARCH
  }
  enum SortType {
    ASC
    DESC
  }

  input WhereInput {
    key: String
    value: String
    values: [String!]
    operator: OperationType!
  }

  enum AssetMatchType {
    POLICY_ID
    POLICY_ASSET_ID
  }

  input SortInput {
    by: String
    type: SortType
  }
`;
