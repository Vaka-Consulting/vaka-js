import { ApolloServer } from "@apollo/server";
import * as dotenv from "dotenv";
import { GraphQLObjectId } from "graphql-objectid-scalar";
import {
  queries as userQueries,
  mutations as userMutations,
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

console.log("User Queries = ", userQueries);
console.log("User Mutations = ", userMutations);

dotenv.config({ override: true });

const resolvers = {
  ...(Object.keys(userQueries).length > 0 && { Query: userQueries }),
  ...(Object.keys(userMutations).length > 0 && { Mutation: userMutations }),
  GraphQLObjectId: GraphQLObjectId,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};

export const server = new ApolloServer({
  typeDefs: [commonTypeDefs, userDefs],
  resolvers,
});
