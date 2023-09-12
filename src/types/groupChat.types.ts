import { Document, Schema } from 'mongoose';

export interface IGroupChat extends Document {
    sender: Schema.Types.ObjectId;
    group: Schema.Types.ObjectId;
    message: string;
    cratedAt: Date;
}
