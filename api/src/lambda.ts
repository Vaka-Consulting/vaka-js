import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { server } from './server.js';
import { DependencyInjection } from './models/di.model.js';
import { mongoOption } from './mikro-orm.config.js';
import { MikroORM } from '@mikro-orm/mongodb';
import { User } from './entities/users.js';
import { TokenService } from './services/token.service.js';


const DI = {} as DependencyInjection;
DI.orm = await MikroORM.init(mongoOption);
DI.em = DI.orm.em;

const tokenService = new TokenService()

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async ({ event, context }) => {

      let ret = {DI}
      
      // Get the user token from the headers.
      const token = event.headers.authorization || '';
      
      const decoded_user = tokenService.getTokenUser(token);
      if(decoded_user == null){
        return ret
      }
  
      const user = await DI.em.fork().findOne(User,{$or:[{email: decoded_user?.email}, {stake_address: decoded_user?.stake_address}]}) || {}
  
      // Add the user to the context
      return { user, DI };
      
    },
  }
);