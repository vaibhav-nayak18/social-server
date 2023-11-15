import { Document, Types } from 'mongoose';
import * as z from 'zod';

import { groupSchema } from '../validators/group.schema.js';

export interface IGroup extends Document {
  name: string;
  category: string;
  admin: Types.ObjectId;
  users: Types.ObjectId[];
}

export type groupType = {
  id: Types.ObjectId;
  name: string;
};
