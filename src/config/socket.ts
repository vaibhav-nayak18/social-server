import { Server } from "socket.io";
import { server } from "../app.js";
import { log } from "console";

export const io = new Server(server, {});

io.on("connection", (socket) => {
  log("user connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });
});
