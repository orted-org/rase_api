import redisClient from "../Helper.RedisInit";

function inMemSet(key: string, value: string, expiryTime: number) {
  return new Promise((resolve, reject) => {
    redisClient.SET(key, value, "EX", expiryTime, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
}

function inMemGet(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.GET(key, (err, reply) => {
      if (err) return reject(err);
      return resolve(reply);
    });
  });
}

function inMemDel(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.DEL(key, (err, reply) => {
      if (err) return reject(err);
      return resolve(reply);
    });
  });
}

export { inMemSet, inMemGet, inMemDel };
