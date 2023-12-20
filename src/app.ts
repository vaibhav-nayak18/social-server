import express from "express";
import cors from "cors";
import swagger from "swagger-ui-express";
import path from "path";
import { hostname } from "os";
const __dirname = path.resolve();

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
import { swaggerDocument } from "./config/swagger.js";

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
  res.sendFile(__dirname + "/index.html");
  // res.status(200).json({
  //   message: "hello world!",
  // });
});

app.use("/api/docs/", swagger.serve, swagger.setup(swaggerDocument, {}));

// health check route
app.get("/api/v1/health", (_req: UserRequest, res) => {
  res.status(200).json({
    message: "Hello, God!",
    hostname: hostname(),
  });
});

// auth routes
app.use("/api/v1/auth", authRoute);

// user routes
app.use("/api/v1/user", authorizationUser, userRoute);

// personal routes
app.use("/api/v1/personal", authorizationUser, personalRoute);

//group routes
app.use("/api/v1/group", authorizationUser, groupRoute);
