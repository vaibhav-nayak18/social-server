import express from "express";
import {
  getPersonalMessage,
  removeFriend,
} from "../controller/personal.controller.js";

export const personalRoute = express.Router();

// should be friend
personalRoute.delete("/remove", removeFriend);
personalRoute.get("/chat/:id", getPersonalMessage);
personalRoute.put("/chat/:id");

// create friend request
// accept friend request
// decline friend request

//
