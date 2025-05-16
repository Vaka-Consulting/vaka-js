/**
 * This is schema for snapshot collection
 */

import gql from "graphql-tag";

export const userDefs = gql`
  input SurveyItems {
    key: String!
    value: String!
  }

  type Session {
    email: String
    stake_address: String
    access_token: String!
  }

  type RefreshSessionOutput {
    session_id: String!
    expiry: DateTime!
  }

  type GenericStatus {
    status: String!
  }

  type User {
    email: String
    stake_address: String
    created: DateTime!
    survey_items: JSON
  }

  type Query {
    refresh_session: Session!

    request_code(email: String!): GenericStatus!

    # Login with wallet
    login_wallet(
      stake_address: String!
      signature: String!
      key: String!
    ): Session

    login_user(
      stake_address: String!
      signature: String!
      key: String!
    ): Session

    # Login with policy id
    login_with_policy_id(
      stake_address: String!
      signature: String!
      key: String!
      match_type: AssetMatchType!
    ): Session!

    # Only get user info
    user: User!
  }

  type Mutation {
    # submit_survey(email: String!): String!
    register(
      email: String
      survey_items: String
      stake_address: String
      signature: String
      key: String
    ): GenericStatus!
    verify_code(code: String!): Session!
    verify_otp(email: String!, otp: String!): Session!
  }
`;
