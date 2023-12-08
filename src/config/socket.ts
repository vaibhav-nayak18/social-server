import { Server } from "socket.io";
import { server } from "../app.js";
import { log } from "console";

export const io = new Server(server, {});

const map = new Map<string, string>();

io.on("connection", (socket) => {
  socket.on("connect", (data: { id: string }) => {
    log("user connected: ", socket.id);
    log("data", data);
    map.set(data.id, socket.id);
  });
  socket.on("chat message", (data: { msg: string }) => {
    console.log("message: " + data.msg);
    socket.emit("chat message", data.msg);
  });

  socket.on(
    "sendMessage",
    (data: { id: string; msg: string; reciverId: string }) => {
      // TODO: check the input data

      log("data :", data);
      const socketId = map.get(data.reciverId);
      if (!socketId) {
        return;
      }
      socket.in([socketId, socket.id]).emit("chatMessage", data.msg);
    },
  );

  socket.on("disconnect", () => {
    let userId = "";
    map.forEach((val, key) => {
      if (socket.id === val) {
        userId = key;
      }
    });

    if (!userId || userId !== "") {
      return;
    }

    map.delete(userId);
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
