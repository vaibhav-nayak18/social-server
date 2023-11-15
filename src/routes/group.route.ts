import express from 'express';

import {
  createGroupController,
  getMessagesController,
  joinGroupController,
  leaveGroupController,
  removeMemberController,
} from '../controller/group.controller.js';

export const groupRoute = express.Router();

// only authenticated users can access
groupRoute.post('/create', createGroupController);
groupRoute.post('/join', joinGroupController);
groupRoute.post('/leave', leaveGroupController);

// only group members can access
groupRoute.get('/chats/:id', getMessagesController);

// Only accessible to group admin
groupRoute.post('/remove', removeMemberController);
