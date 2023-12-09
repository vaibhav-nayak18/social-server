import { Server } from "socket.io";
import { server } from "../app.js";
import { log } from "console";
import { SocketServer } from "../socket/index.js";

export const io = new Server(server, {});

const socketServer = new SocketServer();

io.on("connection", (socket) => {
  socket.on("connect", (data: { id: string }) => {
    log("data", data);
  });

  socket.on("chat message", (data: { msg: string }) => {
    console.log("message: " + data.msg);
    socket.emit("chat message", data.msg);
  });

  socket.on("sendMessage", () => {});

  socket.on("disconnect", () => {
    socketServer.removeUser(socket.id);
  });

  socket.on("personalMessage", (data) => {
    log("data", data);
  });

  socket.on("groupMessage", (data) => {
    log("data", data);
  });

  socket.on("sendFriendRequest", (data) => {
    log("data", data);
  });

  socket.on("acceptFriendRequest", (data) => {
    log("data", data);
  });

  socket.on("declineFriendRequest", (data) => {
    log("data", data);
  });
});
