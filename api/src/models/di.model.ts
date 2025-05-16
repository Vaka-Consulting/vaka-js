import { EntityManager, MikroORM } from "@mikro-orm/core";

import { TokenService } from "../services/token.service";

export interface DependencyInjection {
  orm: MikroORM;
  em: EntityManager;
  tokenService: TokenService;
}
