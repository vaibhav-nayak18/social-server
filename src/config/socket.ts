import { Server } from "socket.io";
import { server } from "../app.js";
import { log } from "console";
import { SocketServer } from "../socket/index.js";

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const socketServer = new SocketServer();

io.on("connection", (socket) => {
  socket.on("join user", (data: string) => {
    try {
      socketServer.setUser(socket.id, data);
      log("hello ", socketServer.getUser(data));
    } catch (error) {
      log("error", error);
    }
  });

  socket.on("join group", (data: { groupId: string; users: string[] }) => {});

  socket.on("disconnect", () => {
    try {
      socketServer.removeUser(socket.id);
    } catch (error) {
      log("error", error);
    }
  });

  socket.on(
    "personal chat",
    (data: {
      sender: { _id: string; username: string };
      _id: string;
      receiver: string;
      message: string;
      createdAt: string;
    }) => {
      try {
        const id = socketServer.getUser(data.receiver);
        if (id) {
          socket.to(id).emit("personal chat", data);
        }
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

  if (msg === "" || msg.length > 80) {
    return false;
  }

  return true;
}
