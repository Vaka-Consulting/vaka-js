import {
  generatePrivateKey,
  generateSeedPhrase,
  toHex,
  toPublicKey,
} from "@lucid-evolution/lucid";
import { lucid } from "./blockfrost.service.js";
import crypto from "crypto";
import { DependencyInjection } from "../models/di.model.js";
import { Wallet } from "../entities/wallet.js";
import Cardano, {
  PublicKey,
  RewardAddress,
  Credential,
  NetworkId,
  Address,
  BaseAddress,
} from "@emurgo/cardano-serialization-lib-nodejs";
import {
  COSESign1,
  Label,
  COSEKey,
  Int,
  BigNum,
  CBORValue,
} from "@emurgo/cardano-message-signing-nodejs";
import { AddressType } from "../models/common.js";
import { network } from './blockfrost.service.js';

export const getWalletRepository = (contextValue: any) => {
  const { DI } = contextValue as { DI: DependencyInjection };
  const fork = DI.orm.em.fork();

  const walletRepository = fork.getRepository(Wallet);

  return { walletRepository, fork };
};

// Convert a normal string to a 32-byte key suitable for AES-256
const generateKeyFromString = (inputString: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  return hash.digest("hex");
};

// Helper function to encrypt sensitive data
const encryptSensitiveData = (data: any) => {
  const algorithm = "aes-256-cbc";
  const hexstring = generateKeyFromString(process.env.ENCRYPTION_KEY || "");
  const key = Buffer.from(hexstring, "hex");
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

// Helper function to decrypt sensitive data
export const decryptSensitiveData = (encryptedData: string) => {
  const algorithm = "aes-256-cbc";
  const hexstring = generateKeyFromString(process.env.ENCRYPTION_KEY || "");
  const key = Buffer.from(hexstring, "hex");

  // Split the IV and the actual encrypted data
  const [ivHex, encrypted] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

// Extract address information from COSE headers
const extractAddressInfo = (headermap: any) => {
  const addressBytes = headermap
    .header(Label.new_text("address"))
    ?.to_bytes() as Uint8Array;
  const addressHex = Buffer.from(addressBytes).toString("hex").substring(4);
  const address = Address.from_bytes(Buffer.from(addressHex, "hex"));
  if (address.to_bech32().startsWith("addr")) {
    console.log("Payment address: ", address.to_bech32());
    const addr = BaseAddress.from_address(address);
    return { address: addr, type: AddressType.PAYMENT };
  } else if (address.to_bech32().startsWith("stake")) {
    console.log("Stake Address: ", address.to_bech32());
    return { address, type: AddressType.STAKE };
  }

  return { address, type: AddressType.PAYMENT };
};

// Get stake address from base address
const getStakeAddress = (addr: any, networkId: number) => {
  const stakeCredential = addr?.stake_cred() as Credential;
  const rewardAddress = RewardAddress.new(networkId, stakeCredential);
  const rewardAddressBech32 = rewardAddress.to_address().to_bech32();

  console.log("Reward Address Extracted: ", rewardAddressBech32);

  return rewardAddressBech32;
};

// Extract public key from COSE key
const extractPublicKey = (key: any) => {
  const cborVal = key.header(
    Label.new_int(Int.new_negative(BigNum.from_str("2")))
  ) as CBORValue;

  const pubKeyBytes = cborVal.as_bytes() as Uint8Array;
  const publicKey = PublicKey.from_bytes(pubKeyBytes);

  return publicKey;
};

// Verify signature with public key
const verifySignature = (decoded: any, publicKey: any) => {
  const signature = Cardano.Ed25519Signature.from_bytes(decoded.signature());
  const receivedData = decoded.signed_data().to_bytes();
  const isVerified = publicKey.verify(receivedData, signature);

  return isVerified;
};

// Check if payload matches expected message
const verifyPayload = (payload: Uint8Array, expectedMessage: string) => {
  const payloadAsString = Buffer.from(payload as Uint8Array).toString();
  const payloadMatches = payloadAsString === expectedMessage;

  return payloadMatches;
};

const verifyStakeAddress = (
  address: any,
  networkId: number,
  stakeAddress: string,
  type: AddressType
) => {
  if (type == AddressType.PAYMENT) {
    const rewardAddressBech32 = getStakeAddress(address, networkId as number);
    const isStakeAddressValid = rewardAddressBech32 === stakeAddress;
    return isStakeAddressValid;
  } else if (type == AddressType.STAKE) {
    const isStakeAddressValid = address.to_bech32() === stakeAddress;
    return isStakeAddressValid;
  }
};

// Main wallet validation function
export const validateWallet = async (input: any) => {
  const expectedMessage = "Hello";
  let networkId;

  if (network === "preprod" || network === "testnet") {
    networkId = NetworkId.testnet().kind();
  } else if (network === "mainnet") {
    networkId = NetworkId.mainnet().kind();
  }

  console.log("Network ID: ", networkId);

  // Decode the COSE Sign1 signature
  const decoded = COSESign1.from_bytes(Buffer.from(input.signature, "hex"));
  const headermap = decoded.headers().protected().deserialized_headers();

  // Extract address information
  const { address, type } = extractAddressInfo(headermap);

  const isStakeAddressValid = verifyStakeAddress(
    address,
    networkId as number,
    input.stake_address,
    type
  );

  // Get stake address
  // let isStakeAddressValid = false;
  // if (type == AddressType.PAYMENT) {
  //   const rewardAddressBech32 = getStakeAddress(address, networkId as number);
  //   isStakeAddressValid = rewardAddressBech32 === input.stake_address;
  // } else {
  //   isStakeAddressValid = address.to_bech32() === input.stake_address;
  // }

  // Extract and verify public key
  const key = COSEKey.from_bytes(Buffer.from(input.key, "hex"));
  const publicKey = extractPublicKey(key);

  // Verify payload
  const payload = decoded.payload();
  const payloadAsExpected = verifyPayload(
    payload as Uint8Array,
    expectedMessage
  );

  // Verify signature
  const isVerified = verifySignature(decoded, publicKey);

  // Log signature information
  console.log("Signature: ", Buffer.from(decoded.signature()).toString("hex"));

  // Final validation result
  const isValid = isVerified && payloadAsExpected && isStakeAddressValid;

  return isValid;
};

export const generateWallet = async () => {
  const seedPhrase = generateSeedPhrase();
  const privateKey = generatePrivateKey();

  lucid.selectWallet.fromSeed(seedPhrase);

  const address = await lucid.wallet().address();
  const stakeAddress = await lucid.wallet().rewardAddress();

  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode("Hello");
  const message = toHex(encodedMessage);
  const publickey = toPublicKey(privateKey);
  const signedMessage = await lucid.wallet().signMessage(address, message);
  const signature = signedMessage.signature;
  const key = signedMessage.key;

  return {
    address,
    stakeAddress,
    encryptedPrivateKey: encryptSensitiveData(privateKey),
    encryptedSeedPhrase: encryptSensitiveData(seedPhrase),
    signature: signature,
    key: key,
    publicKey: publickey,
  };
};
