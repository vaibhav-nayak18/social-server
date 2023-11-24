import express from "express";
import {
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../controller/dm.controller.js";

export const dmRoute = express.Router();

friendRoute.post("/send", sendFriendRequest);
friendRoute.delete("/remove", removeFriend);
friendRoute.put("/accept", acceptFriendRequest);
friendRoute.delete("/decline", declineFriendRequest);
