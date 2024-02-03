import express from "express";

import {
  createGroupController,
  getMessagesController,
  joinGroupController,
  leaveGroupController,
  removeMemberController,
  getAllGroupsController,
  deleteGroupsController,
  sendGroupMessage,
  getMyGroupController,
} from "../controller/group.controller.js";

export const groupRoute = express.Router();

groupRoute.get("/", getAllGroupsController);
groupRoute.post("/create", createGroupController);
groupRoute.get("/my", getMyGroupController);
groupRoute.put("/join/:groupId", joinGroupController);
groupRoute.post("/remove/:groupId", removeMemberController);
groupRoute.post("/delete/:groupId", deleteGroupsController);
groupRoute.post("/leave/:groupId", leaveGroupController);
groupRoute.get("/chats/:groupId", getMessagesController);
groupRoute.put("/chats/:groupId", sendGroupMessage);
