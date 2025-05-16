import { ApolloServer } from "@apollo/server";
import * as dotenv from "dotenv";
import { GraphQLObjectId } from "graphql-objectid-scalar";
import {
  queries as UserQueries,
  mutations as UserMutations,
} from "./resolvers/users.js";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";

import { commonTypeDefs } from "./gql/common.gql.js";
import { userDefs } from "./gql/users.gql.js";
import { DependencyInjection } from "./models/di.model.js";
import { User } from "./entities/users.js";

export interface ContextType {
  DI: DependencyInjection;
  user: User;
}

dotenv.config({ override: true });

const resolvers = {
  Query: {
    ...UserQueries,
  },
  Mutation: {
    ...UserMutations,
  },
  GraphQLObjectId: GraphQLObjectId,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};

export const server = new ApolloServer({
  typeDefs: [commonTypeDefs, userDefs],
  resolvers,
});
