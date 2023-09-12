import { Schema, model } from 'mongoose';
import { IGroupChat } from '../types/groupChat.types.js';

const groupChatSchema = new Schema<IGroupChat>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    group: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    cratedAt: {
        type: Date,
        default: Date.now(),
    },
});

export const GroupChats = model<IGroupChat>('GroupChats', groupChatSchema);
