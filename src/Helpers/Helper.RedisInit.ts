import redis from "redis";
import ENV from "./Config/env";

const redisClient = redis.createClient({
  host: ENV.connectivity.redisUri || "redis",
  port: ENV.connectivity.redisPort || 6379,
});

redisClient.on("connect", () => {
  console.log("Connected To Redis");
});

redisClient.on("error", (err) => {
  console.log(err.message);
});

redisClient.on("ready", () => {
  console.log("Redis ready to use");
});

redisClient.on("end", () => {
  console.log("Redis disconnected");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

export default redisClient;
