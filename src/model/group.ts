import { Schema, model } from 'mongoose';

import { IGroup } from '../types/group.type.js';

const groupSchema = new Schema<IGroup>({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  users: [Schema.Types.ObjectId],
});

export const Groups = model<IGroup>('Group', groupSchema);
