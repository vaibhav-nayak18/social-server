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

personalRoute.get("/", getAllFriendsController);
personalRoute.post("/create", sendFriendRequestController);
personalRoute.post("/accept/:requestId", acceptFriendRequestController);
personalRoute.delete("/decline/:requestId", declineFriendRequestController);
personalRoute.put("/chat/:friendId", isFriend, sendMessage);
personalRoute.get("/chat/:friendId", isFriend, getPersonalMessage);
personalRoute.delete("/remove/:friendId", isFriend, removeFriendController);

// 4 - 65872328d33a6515c270f120
// 3 - 6587231fd33a6515c270f11c
// 2 - 65872309d33a6515c270f114
// 1 - 658722ffd33a6515c270f110
