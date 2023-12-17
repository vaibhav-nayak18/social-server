import express from "express";
import { isFriend } from "../middleware/isFriend.js";
import {
  acceptFriendRequestController,
  declineFriendRequestController,
  sendFriendRequestController,
  sendMessage,
  getPersonalMessage,
  removeFriendController,
  getAllFriendsController,
} from "../controller/personal.controller.js";

export const personalRoute = express.Router();

personalRoute.post("/create", sendFriendRequestController);
personalRoute.post("/accept/:requestId", acceptFriendRequestController);

personalRoute.delete(
  "/decline/:requestId",
  isFriend,
  declineFriendRequestController,
);
personalRoute.put("/chat/:friendId", isFriend, sendMessage);
personalRoute.get("/chat/:friendId", isFriend, getPersonalMessage);
personalRoute.delete("/remove/:friendId", isFriend, removeFriendController);
