import { Server } from "socket.io";
import { server } from "../app.js";
import { log } from "console";
import { SocketServer } from "../socket/index.js";

export const io = new Server(server, {});

const socketServer = new SocketServer();

io.on("connection", (socket) => {
  socket.on("chat message", async (data: { msg: string }) => {
    try {
      console.log("message: " + data.msg);
      socket.emit("chat message", data.msg);
    } catch (error) {
      log("error", error);
    }
  });

  socket.on("connect", (data: { userId: string }) => {
    try {
      socketServer.setUser(socket.id, data.userId);
    } catch (error) {
      log("error", error);
    }
  });

  socket.on("disconnect", () => {
    try {
      socketServer.removeUser(socket.id);
    } catch (error) {
      log("error", error);
    }
  });

  socket.on(
    "personal message",
    (data: { senderId: string; receiverId: string; msg: string }) => {
      try {
        log("data", data);
      } catch (error) {
        log("error", error);
      }
    },
  );

  socket.on(
    "group message",
    (data: { senderId: string; groupId: string; msg: string }) => {
      try {
        log("data", data);
      } catch (error) {
        log("error", error);
      }
    },
  );

  socket.on(
    "send friend request",
    (data: { senderId: string; receiverId: string }) => {
      try {
        log("data", data);
      } catch (error) {
        log("error", error);
      }
    },
  );

  socket.on(
    "friend request",
    (data: { requestId: string; userId: string; isAccept: boolean }) => {
      try {
        log("data", data);
      } catch (error) {
        log("error", error);
      }
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
