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

  socket.on("join groups", (data: { userId: string; groupIds: string[] }) => {
    try {
      socketServer.setGroups(data.groupIds, data.userId);
    } catch (error) {
      log("error", error);
    }
  });

  socket.on("group message", (data: { groupId: string }) => {
    try {
      log("data", data);
      const groups = socketServer.getGroups(data.groupId);

      log("Groups", groups);
      groups?.forEach((val) => {
        const socketId = socketServer.getUser(val);
        if (socketId) {
          socket.to(socketId).emit("group message", data);
        }
      });
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
    "friend request",
    (data: { friend: { _id: string; username: string } }) => {
      try {
        const socketId = socketServer.getUser(data.friend._id);
        if (socketId) {
          socket.to(socketId).emit("friend request", data);
        }
      } catch (error) {
        log("error", error);
      }
    },
  );

  socket.on("accept friend request", (data: { friend: { _id: string } }) => {
    try {
      log("data", data);
      const socketId = socketServer.getUser(data.friend._id);
      if (socketId) {
        socket.to(socketId).emit("accept friend request", data);
      }
    } catch (error) {
      log("error", error);
    }
  });

  socket.on(
    "remove user",
    (data: { id: string; username: string; to: string }) => {
      try {
        const socketId = socketServer.getUser(data?.to);
        if (socketId) {
          socket.to(socketId).emit("remove user", data);
        }
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
