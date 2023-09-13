import { Document, Schema } from 'mongoose';
import { z } from 'zod';
import { ObjectId } from 'mongoose';

const customCategory = [
    'entertainment',
    'education',
    'sports',
    'programming',
    'others',
] as const;

export interface IGroup extends Document {
    name: string;
    description: string;
    category: string;
    users: Schema.Types.ObjectId[];
    admin: Schema.Types.ObjectId;
    cratedAt: Date;
}

export const descriptionSchema = z
    .string()
    .min(6, 'Group description should be at least 6 characters');

export const objectIdSchema = z.custom<ObjectId>();
export const createGroupSchema = z.object({
    name: z.string().min(3, 'Group name should be at least 3 characters'),
    description: descriptionSchema,
    category: z
        .enum([...customCategory])
        .refine(
            (val) => customCategory.includes(val),
            'please select a category ',
        ),
    admin: objectIdSchema,
});

export type createGroupType = z.infer<typeof createGroupSchema>;
export type objectIdType = z.infer<typeof objectIdSchema>;
export type descriptionType = z.infer<typeof descriptionSchema>;
