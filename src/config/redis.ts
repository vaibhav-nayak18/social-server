import { createClient } from "redis";
import { REDIS } from "./env.js";
import { log } from "console";

log("redis hello:", REDIS);
const client = createClient({
  url: REDIS,
  // password: PASSWORD,
});

try {
  client.on("error", (err) => console.log("Redis Error: ", err));
  await client.connect();
} catch (error) {
  log("redis error", error);
}

export default client;
