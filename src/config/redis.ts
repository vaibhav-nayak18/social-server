import { RedisClientType, createClient } from "redis";
import { REDIS, PASSWORD, ENV } from "./env.js";
import { log } from "console";

let redis: RedisClientType | undefined;
if (ENV === "render") {
  redis = createClient({
    url: REDIS,
    password: PASSWORD,
  });
} else {
  redis = createClient({
    url: REDIS,
  });
}

const client = redis;

try {
  client.on("error", (err) => console.log("Redis Error: ", err));
  await client.connect();
} catch (error) {
  log("redis error", error);
}

export default client;
