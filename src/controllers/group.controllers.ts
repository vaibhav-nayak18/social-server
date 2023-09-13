import { IAdminRequest, IRequest } from '../types/global.types.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateInput } from '../middleware/validator.js';
import {
    IGroup,
    createGroupSchema,
    createGroupType,
    objectIdType,
} from '../types/group.types.js';
import {
    createGroup,
    joinGroup,
    leaveGroup,
    updateDescription,
} from '../services/group.services.js';
import { Response } from 'express';
import { resultType } from '../middleware/errorHandler.js';

export const createGroupController = asyncHandler(
    async (req: IRequest, res: Response) => {
        const reqBody = req.body;

        const {
            isError: inputError,
            message: errorMessage,
            userInput,
        } = validateInput<createGroupType>(reqBody, createGroupSchema);

        if (inputError) {
            return res.status(400).json({
                error: true,
                errorMessage,
            });
        }

        const [isError, { message, statusCode, data: group }] =
            (await createGroup(userInput)) as [boolean, resultType<IGroup>];

        if (isError || !group) {
            return res.status(statusCode).json({
                error: true,
                message,
            });
        }

        res.status(200).json({
            error: false,
            group: {
                id: group._id,
            },
        });
    },
);

export const joinGroupController = asyncHandler(
    async (req: IRequest, res: Response) => {
        const { groupId } = req.body as { groupId: objectIdType };

        if (!groupId) {
            return res.status(403).json({
                error: true,
                message: 'group id is required',
            });
        }

        const [isError, { message, statusCode, data: group }] =
            (await joinGroup(groupId, req.user?._id)) as [
                boolean,
                resultType<IGroup>,
            ];

        if (isError || !group) {
            return res.status(statusCode).json({
                error: true,
                message,
            });
        }

        res.status(200).json({
            error: false,
            message: 'success',
            group: {
                groupId: group._id,
            },
        });
    },
);

export const leaveGroupController = asyncHandler(
    async (req: IRequest, res: Response) => {
        const { groupId } = req.body as {
            groupId: objectIdType;
        };

        if (!groupId) {
            return res.status(403).json({
                error: true,
                message: 'invalid group id',
            });
        }

        const [isError, { message, statusCode, data: group }] =
            (await leaveGroup(groupId, req.user?.id)) as [
                boolean,
                resultType<IGroup>,
            ];

        if (isError || !group) {
            return res.status(statusCode).json({
                error: true,
                message,
            });
        }

        res.status(200).json({
            error: false,
            group: {
                groupId: group._id,
            },
        });
    },
);

// Admin access able routes

export const updateGroupController = asyncHandler(
    async (req: IAdminRequest, res: Response) => {
        const { description } = req.body as { description: string };

        if (!description || description.length < 6) {
            return res.status(403).json({
                error: true,
                message: 'invalid description',
            });
        }

        if (!req.groupId) {
            return res.status(401).json({
                error: true,
                message: 'group admin only allowed to update the description',
            });
        }

        const [isError, { message, statusCode, data: group }] =
            (await updateDescription(req.groupId, description)) as [
                boolean,
                resultType<IGroup>,
            ];

        if (isError || !group) {
            return res.status(statusCode).json({
                error: true,
                message,
            });
        }

        res.status(200).json({
            error: false,
            group: {
                id: group._id,
                name: group.name,
                description: group.description,
                category: group.category,
            },
        });
    },
);
