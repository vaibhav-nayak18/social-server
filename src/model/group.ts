import { Schema, model } from "mongoose";

import { IGroup } from "../types/group.type.js";

const groupSchema = new Schema<IGroup>({
  name: {
    type: String,
    required: true,
  },

  admin: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

export const Groups = model<IGroup>("Groups", groupSchema);
