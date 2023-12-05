import { createClient } from "redis";
import { PASSWORD, REDIS } from "./env.js";

const client = createClient({
  url: REDIS,
  password: PASSWORD,
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

export default client;
