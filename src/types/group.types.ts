import { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
    name: string;
    description: string;
    category: string;
    users: Schema.Types.ObjectId[];
    admin: Schema.Types.ObjectId;
    cratedAt: Date;
}
