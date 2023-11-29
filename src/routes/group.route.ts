import express from "express";

import {
  createGroupController,
  createMessageController,
  getMessagesController,
  joinGroupController,
  leaveGroupController,
  removeMemberController,
} from "../controller/group.controller.js";

export const groupRoute = express.Router();

// only authenticated users can access
groupRoute.post("/create", createGroupController);
groupRoute.post("/join", joinGroupController);

// Only accessible to group admin
groupRoute.post("/remove", removeMemberController);

// only group members can access
groupRoute.post("/leave", leaveGroupController);
groupRoute.put("/chats/create", createMessageController);
groupRoute.get("/chats/:id", getMessagesController);
