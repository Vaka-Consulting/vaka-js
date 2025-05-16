import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
dotenv.config({ override: true });
import { server } from "./server.js";

import { DependencyInjection } from "./models/di.model.js";
import { MikroORM, MongoEntityManager, MongoDriver } from "@mikro-orm/mongodb";
import { mongoOption } from "./mikro-orm.config.js";
import { User } from "./entities/index.js";
import { TokenService } from "./services/token.service.js";

// Initialize DI container
const DI = {
  orm: await MikroORM.init<MongoDriver>(mongoOption),
  em: (await MikroORM.init<MongoDriver>(mongoOption))
    .em as MongoEntityManager<MongoDriver>,
  tokenService: new TokenService(),
} as DependencyInjection;

const { url } = await startStandaloneServer(server, {
  listen: { port: 9001 },

  context: async ({ req, res }) => {
    let ret = { DI };

    // Get the user token from the headers.
    const token = req.headers.authorization || "";

    const decoded_user = DI.tokenService.getTokenUser(token);
    if (decoded_user == null) {
      return ret;
    }

    const user =
      (await DI.em.fork().findOne(User, {
        $or: [
          { email: decoded_user?.email },
          { stake_address: decoded_user?.stake_address },
        ],
      })) || {};

    // Add the user to the context
    return { user, DI };
  },
});

console.log(`🚀  Server ready at: ${url}`);
