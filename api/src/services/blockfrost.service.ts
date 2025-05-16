import "dotenv/config";
import { Lucid, Blockfrost, Network } from "@lucid-evolution/lucid";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";

const POLICY_ID = process.env.POLICY_ID as string;
const ASSET_NAME = process.env.ASSET_NAME as string;

export const network = process.env.BLOCKFROST_NETWORK || ("preprod" as Network);
export const lucidNetwork = network.toLowerCase() as Network;

export const blockfrostClient: BlockFrostAPI = new BlockFrostAPI({
  projectId: process.env.BLOCKFROST_API_KEY ?? "",
});

console.log("BaseApi = ", blockfrostClient.apiUrl);
console.log("Blockfrost Network = ", lucidNetwork);
console.log("Lucid Network = ", lucidNetwork);

export const lucid = await Lucid(
  new Blockfrost(blockfrostClient.apiUrl, blockfrostClient.projectId),
  lucidNetwork
);

export const getAssets = async (stakeAddress: string) => {
  const data = await blockfrostClient.accountsAddressesAssetsAll(stakeAddress);
  return data;
};

export const doesPolicyIdMatch = async (stakeAddress: string) => {
  const assets: any = await getAssets(stakeAddress);
  const unit = POLICY_ID + ASSET_NAME;
  const doesMatch = assets.some((asset: any) => asset.unit === unit);
  return doesMatch;
};

export const doesPolicyIdMatchStartsWith = async (stakeAddress: string) => {
  const assets: any = await getAssets(stakeAddress);
  const doesMatch = assets.some((asset: any) =>
    asset.unit.startsWith(POLICY_ID)
  );
  return doesMatch;
};
