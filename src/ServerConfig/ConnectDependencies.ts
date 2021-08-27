import { connectToDB } from "../Helpers/Helper.DBInit";
async function ConnectDependencies() {
  try {
    await connectToDB();
    require("../Helpers/Helper.RedisInit");
  } catch (err) {
    throw err;
  }
}
export default ConnectDependencies;
