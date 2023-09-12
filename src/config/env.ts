import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URL = process.env.MONGODB_URL as string;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
export const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP as string;
