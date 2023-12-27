import { config } from "dotenv";
config({ path: "./.env" });

export let db_host;
export let db_name;
export let db_user;
export let db_password;
export let db_port;

const environment = process.env.NODE_ENV || "DEV";

if (process.env.GITHUB_ACTIONS) {
  db_host = String(process.env.GA_DB_HOST);
  db_name = String(process.env.GA_DB_NAME);
  db_user = String(process.env.GA_DB_USER);
  db_password = String(process.env.GA_DB_PASSWORD);
  db_port = String(process.env.GA_DB_PORT);
} else if (environment === "PROD") {
  db_host = String(process.env.PROD_DB_HOST);
  db_name = String(process.env.PROD_DB_NAME);
  db_user = String(process.env.PROD_DB_USER);
  db_password = String(process.env.PROD_DB_PASSWORD);
  db_port = String(process.env.PROD_DB_PORT);
} else if (environment === "TEST") {
  db_host = String(process.env.TEST_DB_HOST);
  db_name = String(process.env.TEST_DB_NAME);
  db_user = String(process.env.TEST_DB_USER);
  db_password = String(process.env.TEST_DB_PASSWORD);
  db_port = String(process.env.TEST_DB_PORT);
} else {
  db_host = String(process.env.DEV_DB_HOST);
  db_name = String(process.env.DEV_DB_NAME);
  db_user = String(process.env.DEV_DB_USER);
  db_password = String(process.env.DEV_DB_PASSWORD);
  db_port = String(process.env.DEV_DB_PORT);
}
