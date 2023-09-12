import { Schema, model } from 'mongoose';
import { IGroup } from '../types/group.types.js';

const groupSchema = new Schema<IGroup>({
    name: {
        type: String,
        unique: true,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
    ],

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    cratedAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});

export const Groups = model<IGroup>('Groups', groupSchema);
