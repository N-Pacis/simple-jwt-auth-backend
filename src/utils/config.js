import { config } from "dotenv";
config({ path: "./.env" });

export let db_host;
export let db_name;
export let db_user;
export let db_password;

db_host = String(process.env.DEV_DB_HOST);
db_name = String(process.env.DEV_DB_NAME);
db_user = String(process.env.DEV_DB_USER);
db_password = String(process.env.DEV_DB_PASSWORD);
