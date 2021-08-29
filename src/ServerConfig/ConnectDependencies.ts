import { connectToDB, migrateDB } from "../Helpers/Helper.DBInit";
async function ConnectDependencies() {
  try {
    await connectToDB();
    await migrateDB();
    require("../Helpers/Helper.RedisInit");
  } catch (err) {
    throw err;
  }
}
export default ConnectDependencies;
