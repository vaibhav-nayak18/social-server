import express from "express";
import {
  acceptFriendRequest,
  declineFriendRequest,
  getPersonalMessage,
  removeFriend,
  sendFriendRequest,
} from "../controller/personal.controller.js";

export const personalRoute = express.Router();

// should be user
personalRoute.post("/send", sendFriendRequest);
personalRoute.put("/accept", acceptFriendRequest);
personalRoute.delete("/decline", declineFriendRequest);

// should be friend
personalRoute.delete("/remove", removeFriend);
personalRoute.get("/chat/:id", getPersonalMessage);
personalRoute.put("/chat/:id");
