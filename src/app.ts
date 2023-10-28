import express from "express";
import cors from "cors";
import { createServer } from "http";
import { userRoute } from "./routes/auth.route.js";

export const app = express();
export const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//  test routes
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "hello world!",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "This is the health message",
  });
});

// auth routes
app.use("/api/v1/auth", userRoute);

// authorize

// user routes
