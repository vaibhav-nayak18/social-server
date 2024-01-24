import { RedisClientType, createClient } from "redis";
import { REDIS_PASSWORD, REDIS_PORT, REDIS } from "./env.js";
import { log } from "console";

// let redis: RedisClientType | undefined;
// if (ENV === "render") {
//   redis = createClient({
//     url: REDIS,
//     password: PASSWORD,
//   });
// } else {
//   redis = createClient({
//     url: REDIS,
//   });
// }
//
log("redis", REDIS, REDIS_PASSWORD);

const client = createClient({
  password: REDIS_PASSWORD,
  url: REDIS,
});

try {
  client.on("error", (err) => console.log("Redis Error: ", err));
  await client.connect();
} catch (error) {
  log("redis error", error);
}

log("redis", REDIS_PORT);

export default client;
