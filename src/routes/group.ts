import express from "express";

import {
  createGroupController,
  getMessagesController,
  joinGroupController,
  leaveGroupController,
  removeMemberController,
  getAllGroupsController,
  deleteGroupsController,
} from "../controller/group.controller.js";

export const groupRoute = express.Router();

// only authenticated users can access
groupRoute.get("/", getAllGroupsController);
groupRoute.post("/create", createGroupController);
groupRoute.put("/join/:groupId", joinGroupController);

// Only accessible to group admin
groupRoute.delete("/remove/:groupId", removeMemberController);
groupRoute.delete("/delete/:groupId", deleteGroupsController);

// only group members can access
groupRoute.delete("/leave/:groupId", leaveGroupController);
groupRoute.get("/chats/:groupId", getMessagesController);
