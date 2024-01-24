import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URL = process.env.MONGODB_URL as string;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
export const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP as string;
export const ORIGIN = process.env.ORIGIN as string;
export const REDIS = process.env.REDIS as string;
export const PASSWORD = process.env.PASSWORD as string;
export const ENV = process.env.ENV as string;

export const HOST = process.env.HOST;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT!);
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
