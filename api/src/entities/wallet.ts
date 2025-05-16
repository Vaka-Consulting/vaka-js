import { Entity, Property } from "@mikro-orm/core";
import { Base } from "./base.js";
import { ObjectId } from "mongodb";

@Entity({ collection: "custodial_wallets" })
export class Wallet extends Base {
  @Property()
  address: string;

  @Property({ nullable: true })
  public_key?: string;

  @Property({ hidden: true })
  encrypted_private_key: string;

  @Property({ hidden: true, nullable: true })
  encrypted_seed_phrase?: string;

  @Property({ default: "mainnet" })
  network: string;

  @Property({ default: "custodial" })
  wallet_type: string;

  @Property({ nullable: true })
  stake_address: string | null;

  @Property()
  created: Date = new Date();

  @Property({ nullable: true })
  last_activity?: Date;

  @Property({ default: true })
  is_active: boolean = true;

  @Property({ default: false })
  recovery_enabled: boolean = false;

  @Property({ nullable: true })
  cached_ada_balance?: string;

  @Property({ nullable: true })
  cached_tokens?: any;

  @Property({ nullable: true })
  last_balance_update?: Date;

  @Property({ nullable: true })
  signature: string;

  @Property({ nullable: true })
  key: string;

  @Property({ nullable: false })
  user_id: ObjectId;
}
