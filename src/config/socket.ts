import { Server } from "socket.io";
import { server } from "../app.js";
import { log } from "console";
import { SocketServer } from "../socket/index.js";

export const io = new Server(server, {});

const socketServer = new SocketServer();

io.on("connection", (socket) => {
  socket.on("chat message", (data: { msg: string }) => {
    console.log("message: " + data.msg);
    socket.emit("chat message", data.msg);
  });

  socket.on("connect", (data: { userId: string }) => {
    socketServer.setUser(socket.id, data.userId);
  });

  socket.on("disconnect", () => {
    socketServer.removeUser(socket.id);
  });

  socket.on(
    "personal message",
    (data: { senderId: string; receiverId: string; msg: string }) => {
      log("data", data);
    },
  );

  socket.on(
    "group message",
    (data: { senderId: string; groupId: string; msg: string }) => {
      log("data", data);
    },
  );

  socket.on(
    "send friend request",
    (data: { senderId: string; receiverId: string }) => {
      log("data", data);
    },
  );

  socket.on(
    "friend request",
    (data: { requestId: string; userId: string; isAccept: boolean }) => {
      log("data", data);
    },
  );
});

export function validateSocketIds(ids: string[]): boolean {
  ids.forEach((val) => {
    if (val.length !== 24) {
      return false;
    }
  });
  return true;
}

export function validateMsg(msg: string): boolean {
  if (!msg) {
    return false;
  }

  if (msg === "" || msg.length > 50) {
    return false;
  }

  return true;
}
