import { Options } from "@mikro-orm/core";
import {
  defineConfig as defineMongodbConfig,
  MongoDriver,
} from "@mikro-orm/mongodb";
import { User, Wallet } from "./entities/index.js";
import dotenv from "dotenv";

dotenv.config({ override: true });

const id = process.env.AWS_ACCESS_KEY_ID || "";
const secret = process.env.AWS_SECRET_ACCESS_KEY || "";
const token = process.env.AWS_SESSION_TOKEN || "";
const server = process.env.DB_SERVER_NAME || "";
const db = process.env.DB_NAME || "onboarding";
const AWS_IAM_URI = `mongodb+srv://${encodeURIComponent(
  id
)}:${encodeURIComponent(
  secret
)}@${server}/${db}?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:${encodeURIComponent(
  token
)}`;
const clientUrl = process.env.DB_URI || AWS_IAM_URI;

const mongoOption: Options<MongoDriver> = defineMongodbConfig({
  entities: [User, Wallet],
  dbName: db,
  clientUrl: clientUrl,
  debug: false,
});

export { mongoOption };
