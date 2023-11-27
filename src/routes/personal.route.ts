import express from "express";
import {
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../controller/notification.controller.js";

export const personalRoute = express.Router();

// should be user
personalRoute.post("/send", sendFriendRequest);
personalRoute.put("/accept", acceptFriendRequest);
personalRoute.delete("/decline", declineFriendRequest);

// should be friend
personalRoute.delete("/remove", removeFriend);
