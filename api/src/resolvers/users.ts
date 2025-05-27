import * as dotenv from "dotenv";
import { User } from "../entities/users.js";
import { Wallet } from "../entities/wallet.js";
import { EmailService } from "../services/email.service.js";
import {
  AssetMatchType,
  Status,
  VerificationMethod,
} from "../models/common.js";
import { TokenService } from "../services/token.service.js";
import { GraphQLError } from "graphql";
import { generateWallet, validateWallet } from "../services/wallet.service.js";
import {
  doesPolicyIdMatch,
  doesPolicyIdMatchStartsWith,
} from "../services/blockfrost.service.js";
dotenv.config();
import {
  validateToken,
  getUserRepository,
  validateRegistration,
  getVerificationMethod,
  getAssetMatchType,
  getUserSession,
} from "../utils/users.js";
import { LOGIN_METHODS } from "../configs/loginConfig.js";

const emailService = new EmailService();
const tokenSevrice = new TokenService();

export const register = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const ret: any = { status: Status.SUCCESS };

  const method = getVerificationMethod(args);
  await validateRegistration(method, args, contextValue);
  const { fork, userRepository, walletRepository } =
    getUserRepository(contextValue);

  const user =
    (await userRepository.findOne({
      $or: [
        {
          $and: [
            { stake_address: { $eq: args.stake_address } },
            { stake_address: { $ne: null } },
          ],
        },
        { $and: [{ email: { $eq: args.email } }, { email: { $ne: null } }] },
      ],
    })) || new User();

  try {
    user.email = "email" in args ? args.email : null;
    user.signed_message = "signed_message" in args ? args.signed_message : null;
    user.stake_address = "stake_address" in args ? args.stake_address : null;
    user.survey_items =
      "survey_items" in args ? JSON.parse(args.survey_items) : null;
    user.created = new Date();
    if (method == VerificationMethod.EMAIL) {
      // Only create wallet for new users
      const walletData = await generateWallet();

      const wallet = new Wallet();
      wallet.address = walletData.address;
      wallet.stake_address = walletData.stakeAddress;
      wallet.encrypted_private_key = walletData.encryptedPrivateKey;
      wallet.encrypted_seed_phrase = walletData.encryptedSeedPhrase;
      wallet.signature = walletData.signature;
      wallet.key = walletData.key;
      wallet.public_key = walletData.publicKey;
      wallet.network = "testnet";
      wallet.wallet_type = "custodial";
      wallet.created = new Date();
      wallet.user_id = user._id;

      wallet._id != null
        ? walletRepository.upsert(wallet)
        : walletRepository.insert(wallet);

      // Update user with reference to stake address
      user.stake_address = walletData.stakeAddress;

      await emailService.sendRegistrationLink(user);
    } else if (method == VerificationMethod.WALLET_CONNECTOR) {
      user.verified = true;
    }
    user._id != null
      ? userRepository.upsert(user)
      : userRepository.insert(user);
    fork.flush();

    return ret;
  } catch (e) {
    console.error("error", e);
    throw new GraphQLError(`Error while sending an email`);
  }
};

export const login_user = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const isValid = validateWallet(args);
  if (!isValid) {
    throw new GraphQLError(`Invalid wallet signed message provided`);
  }
  const { fork, userRepository } = getUserRepository(contextValue);
  const user = await userRepository.findOne({
    stake_address: args.stake_address,
  });
  if (user == null) {
    throw new GraphQLError(`Invalid  user stake address`);
  }
  return getUserSession(user);
};

export const login_wallet = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const isValid = await validateWallet(args);
  if (!isValid) {
    throw new GraphQLError(`Invalid wallet signed message provided`);
  }
  const { fork, userRepository } = getUserRepository(contextValue);
  const user = await userRepository.findOne({
    stake_address: args.stake_address,
  });
  if (user == null) {
    const createdUser = new User();
    createdUser.stake_address = args.stake_address;
    createdUser.created = new Date();
    createdUser.verified = true;
    userRepository.insert(createdUser);
    fork.flush();
    return getUserSession(createdUser);
  }
  return getUserSession(user);
};

export const login_with_policy_id = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  // Validating wallet
  const isValid = await validateWallet(args);
  if (!isValid) {
    throw new GraphQLError(`Invalid wallet signed message provided`);
  }

  // Validating asset policy id
  const matchType = getAssetMatchType(args);

  if (matchType == AssetMatchType.POLICY_ASSET_ID) {
    console.log("Matching policy id");
    const isUserAllowed = await doesPolicyIdMatch(args.stake_address);
    console.log("isUserAllowed = ", isUserAllowed);
    if (!isUserAllowed) {
      throw new GraphQLError(`User is not allowed to login`);
    }
  } else if (matchType == AssetMatchType.POLICY_ID) {
    const isUserAllowed = await doesPolicyIdMatchStartsWith(args.stake_address);
    if (!isUserAllowed) {
      throw new GraphQLError(`User is not allowed to login`);
    }
  }

  // Validating user
  const { fork, userRepository } = getUserRepository(contextValue);
  const user = await userRepository.findOne({
    stake_address: args.stake_address,
  });
  if (user == null) {
    const createdUser = new User();
    createdUser.stake_address = args.stake_address;
    createdUser.created = new Date();
    createdUser.verified = true;
    userRepository.insert(createdUser);
    fork.flush();
    return getUserSession(createdUser);
  }

  // Return user session
  return getUserSession(user);
};

export const verify_otp = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const { fork, userRepository } = getUserRepository(contextValue);
  console.log("Verifying OTP for user = ", args);
  const user = await userRepository.findOne({
    email: args.email,
    verify_code: args.otp,
    verify_code_expiry: { $gt: new Date() },
  });
  if (user == null) {
    throw new GraphQLError(`Invalid otp provided`);
  }
  user.verify_code = "";
  user.verify_code_expiry = new Date();
  user.verified = true;
  const updatedUser = await userRepository.upsert(user);
  fork.flush();
  console.log("User OTP verified and updated successfully.");
  const session = getUserSession(updatedUser);
  return session;
};

function checkVerificationCode(input: any): User {
  if ("code" in input && input["code"] != "") {
    console.log("Code: ", input.code);
    return emailService.validateCode(input.code);
  }
  throw new GraphQLError(
    "Cannot find verification method. Please check if the code is valid"
  );
}

export const verify_code = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const error = "Invalid code provided";
  const vUser = checkVerificationCode(args);
  if (vUser == null) {
    throw new GraphQLError(error);
  }
  const { fork, userRepository, walletRepository } =
    getUserRepository(contextValue);
  const user = await userRepository.findOne({
    email: vUser.email,
    verify_code: vUser.verify_code,
    verify_code_expiry: { $gt: new Date() },
  });
  if (user == null) {
    console.log("USER NOT FOUND WITH THE VERIFICATION CODE:");
    throw new GraphQLError(error);
  }

  user.verified = true;
  user.verify_code = null;
  user.verify_code_expiry = null;
  fork.upsert(user);
  fork.flush();
  return getUserSession(user);
};

export const request_code = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const { fork, userRepository } = getUserRepository(contextValue);

  let user = await userRepository.findOne({ email: args.email });
  const ret = { status: "FAILED" };

  // Validate if user exist
  if (user == null) {
    throw new GraphQLError(`User ${args.email} not found`);
  }

  // Send verification code and save it
  try {
    user = await emailService.sendVerificationCode(user);
    userRepository.upsert(user);
    fork.flush();
    ret.status = "SUCCESS";
    return ret;
  } catch (e) {
    console.error(e);
    throw new GraphQLError("Error while sending an email ");
  }
};

export const user = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  //Pre validate this endpoint needs the valid session
  validateToken(contextValue);

  const { user } = contextValue;
  return user;
};

export const refresh_session = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  //Pre validate this endpoint needs the valid session
  validateToken(contextValue);

  const { user } = contextValue;
  const access_token = tokenSevrice.generateToken(user as User);
  return {
    email: user?.email,
    access_token,
    stake_address: user?.stake_address,
  };
};

export const queries = {
  ...(LOGIN_METHODS.REFRESH_SESSION ? { refresh_session } : {}),
  ...(LOGIN_METHODS.REGISTER ? { request_code } : {}),
  user,
  ...(LOGIN_METHODS.WALLET ? { login_wallet } : {}),
  ...(LOGIN_METHODS.USER ? { login_user } : {}),
  ...(LOGIN_METHODS.POLICY_ID ? { login_with_policy_id } : {}),
};
export const mutations = {
  ...(LOGIN_METHODS.USER ? { verify_otp } : {}),
  ...(LOGIN_METHODS.REGISTER ? { register } : {}),
  ...(LOGIN_METHODS.REGISTER ? { verify_code } : {}),
};
