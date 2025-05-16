import { GraphQLError } from "graphql";
import {
  AssetMatchType,
  Status,
  VerificationMethod,
} from "../models/common.js";
import { validateWallet } from "../services/wallet.service.js";
import { User } from "../entities/users.js";
import { Wallet } from "../entities/wallet.js";
import { DependencyInjection } from "../models/di.model.js";
import { EmailService } from "../services/email.service.js";
import { TokenService } from "../services/token.service.js";

const emailService = new EmailService();
const tokenSevrice = new TokenService();

const getUserRepository = (contextValue: any) => {
  const { DI } = contextValue as { DI: DependencyInjection };
  const fork = DI.orm.em.fork();
  const userRepository = fork.getRepository(User);
  const walletRepository = fork.getRepository(Wallet);

  return { userRepository, fork, walletRepository };
};

function validateToken(context: any) {
  const { user, DI } = context;
  if (user == null) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
}

async function validateRegistration(
  method: VerificationMethod,
  input: any,
  contextValue: any
) {
  if (method == VerificationMethod.EMAIL) {
    const { fork, userRepository } = getUserRepository(contextValue);
    let user = await userRepository.findOne({
      email: input.email,
    });
    if (user != null) {
      if (user.verified) {
        throw new GraphQLError(`User ${input.email} already exists`);
      } else {
        throw new GraphQLError(
          `User ${input.email} already exists but needs verification.`
        );
      }
    }
  } else if (method == VerificationMethod.WALLET_CONNECTOR) {
    if (!validateWallet(input)) {
      throw new GraphQLError(`Signed message is not valid`);
    }
  }
}
function getVerificationMethod(input: any): VerificationMethod {
  if ("email" in input && input["email"] != "") {
    return VerificationMethod.EMAIL;
  } else if (
    "signature" in input &&
    input["signature"] != "" &&
    "key" in input &&
    input["key"] != ""
  ) {
    return VerificationMethod.WALLET_CONNECTOR;
  }
  throw new GraphQLError(
    "Cannot find verification method. Please use valid least email or signed_message for registration"
  );
}

function getAssetMatchType(input: any): AssetMatchType {
  if (
    "match_type" in input &&
    input["match_type"] === AssetMatchType.POLICY_ASSET_ID
  ) {
    return AssetMatchType.POLICY_ASSET_ID;
  } else if (
    "match_type" in input &&
    input["match_type"] === AssetMatchType.POLICY_ID
  ) {
    return AssetMatchType.POLICY_ID;
  }

  throw new GraphQLError(
    "Cannot find policy id match type. Please use valid match_type, 'match' or 'startswith' for login"
  );
}

function getUserSession(user: User) {
  const access_token = tokenSevrice.generateToken(user as User);
  return {
    email: user?.email,
    access_token,
    stake_address: user?.stake_address,
  };
}

export {
  validateToken,
  validateRegistration,
  getUserRepository,
  getVerificationMethod,
  getAssetMatchType,
  getUserSession,
};
