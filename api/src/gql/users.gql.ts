/**
 * This is schema for snapshot collection
 */

import gql from "graphql-tag";
import { LOGIN_METHODS } from "../configs/loginConfig.js";
import { User } from "../entities/users.js";

const queries = [
  "user: User!",
  LOGIN_METHODS.REFRESH_SESSION && "refresh_session: Session!",
  LOGIN_METHODS.REGISTER && "request_code(email: String!): GenericStatus!",
  LOGIN_METHODS.WALLET &&
    "login_wallet(stake_address: String!, signature: String!, key: String!): Session",
  LOGIN_METHODS.USER &&
    "login_user(stake_address: String!, signature: String!, key: String!): Session",
  LOGIN_METHODS.POLICY_ID &&
    "login_with_policy_id(stake_address: String!, signature: String!, key: String!, match_type: AssetMatchType!): Session!",
]
  .filter(Boolean)
  .join("\n");

const mutations = [
  LOGIN_METHODS.REGISTER &&
    "register(email: String, survey_items: String, stake_address: String, signature: String, key: String): GenericStatus!",
  LOGIN_METHODS.REGISTER && "verify_code(code: String!): Session!",
  LOGIN_METHODS.USER && "verify_otp(email: String!, otp: String!): Session!",
]
  .filter(Boolean)
  .join("\n");

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

  ${queries
    ? `type Query {
    ${queries}
  }`
    : ""}

  ${mutations
    ? `type Mutation {
    ${mutations}
  }`
    : ""}
`;
