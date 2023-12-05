import express from "express";
import cors from "cors";
import swagger from "swagger-ui-express";

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
import { authenticateUser } from "./controller/auth.controller.js";

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

app.use("/api/docs/", swagger.serve, swagger.setup(swaggerDocument, {}));

// health check route
app.get("/health", (_req: UserRequest, res) => {
  res.status(200).json({
    message: "Hello, God!",
  });
});

// auth routes
app.use("/api/v1/auth", authRoute);

// user routes
app.use("/api/v1/user", authenticateUser, userRoute);

// personal routes
app.use("/api/v1/notification", authenticateUser, personalRoute);

//group routes
app.use("/api/v1/group", authenticateUser, groupRoute);
