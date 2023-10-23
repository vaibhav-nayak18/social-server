import express from "express";
import { createServer } from "http";
import { userRoute } from "./routes/auth.route.js";

export const app = express();
export const server = createServer(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//  test route
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// auth routes
app.use("/api/v1", userRoute);

// authorize

// user routes
