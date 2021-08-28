import { Pool, PoolClient } from "pg";
import { MigrateDAO } from "../DAO/DAO.migrate";
import ENV from "./Config/env";
let client: PoolClient;
const pool = new Pool({
  user: ENV.connectivity.postgresUser,
  password: ENV.connectivity.postgresPassword,
  host: ENV.connectivity.postgresHost,
  port: ENV.connectivity.postgresPort,
  database: ENV.connectivity.postgresDB,
});
async function connectToDB() {
  while (true) {
    try {
      client = await pool.connect();
      break;
    } catch (err) {
      console.log("Failed Connecting To DB, retrying");
      console.log(err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.log("Connected To DB");
}
async function migrateDB() {
  while (true) {
    try {
      await new MigrateDAO().MigrateDAOFinal();
      break;
    } catch (err) {
      console.log("Failed Migrating To DB, retrying");
      console.log(err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.log("DB migrated Successfully");
}

export { client, connectToDB, migrateDB };
