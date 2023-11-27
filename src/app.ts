import express from "express";
import cors from "cors";

import { createServer } from "http";
import cookieParser from "cookie-parser";
import { authorizationUser } from "./middleware/authenticateUser.js";
import { UserRequest } from "./types/user.type.js";
import { ORIGIN } from "./config/env.js";
import {
  authRoute,
  userRoute,
  groupRoute,
  personalRoute,
} from "./routes/index.js";

export const app = express();
export const server = createServer(app);

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

//  test routes
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "hello world!",
  });
});

// auth routes
app.use("/api/v1/auth", authRoute);

// authorizing users middleware
app.use(authorizationUser);

// user routes
app.use("/api/v1/user", userRoute);

// personal routes
app.use("/api/v1/notification", personalRoute);

//group routes
app.use("/api/v1/group", groupRoute);

// health check route
app.get("/health", (_req: UserRequest, res) => {
  res.status(200).json({
    message: "This is the health message",
  });
});
