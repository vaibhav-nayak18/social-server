import express from "express";
import {
  getPersonalMessage,
  removeFriend,
  sendFriendRequest,
} from "../controller/personal.controller.js";
import { isFriend } from "../middleware/isFriend.js";

export const personalRoute = express.Router();

// should be friend
personalRoute.delete("/remove", removeFriend);
personalRoute.get("/chat/:id", getPersonalMessage);
personalRoute.put("/chat/:id");

// create friend request
// accept friend request
// decline friend request

//
