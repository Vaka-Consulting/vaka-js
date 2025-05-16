import { Entity, Property } from "@mikro-orm/core";
import { Base } from "./base.js";

@Entity({ collection: "users" })
export class User extends Base {
  @Property({ nullable: true })
  email: string | null;

  @Property({ nullable: true })
  stake_address: string | null;

  @Property({ nullable: true })
  survey_items: any;

  @Property({ nullable: true })
  signed_message: string;

  @Property()
  created: Date;

  @Property({ nullable: true })
  verify_code?: string | null;

  @Property({ nullable: true })
  verify_code_expiry?: Date | null;

  @Property({ default: false })
  verified: boolean = false;
}
