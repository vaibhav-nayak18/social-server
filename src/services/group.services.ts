import { ObjectId } from 'mongoose';
import { getResult } from '../middleware/errorHandler.js';
import { Groups } from '../models/group.js';
import { IGroup, createGroupType } from '../types/group.types.js';

export async function createGroup(groupInput: createGroupType): Promise<
    [
        boolean,
        {
            message: string;
            statusCode: number;
            data?: IGroup;
        },
    ]
> {
    const group = await Groups.create({
        ...groupInput,
    });

    if (group) {
        return [true, getResult<IGroup>('could not create group', 403)];
    }

    return [false, getResult<IGroup>('success', 200, group as IGroup)];
}

export async function joinGroup(groupId: ObjectId, userId: ObjectId) {
    const group = await Groups.findById(groupId);

    if (!group) {
        return [true, getResult<IGroup>('could not find the group', 404)];
    }

    const isPresent = group.users.includes(userId);

    if (isPresent) {
        return [true, getResult<IGroup>('user already present', 403)];
    }

    group.users.push(userId);

    const updatedGroup = (await group.save()) as IGroup;

    return [
        false,
        getResult<IGroup>(
            `you joined the ${group.name}`,
            200,
            updatedGroup as IGroup,
        ),
    ];
}

export async function leaveGroup(groupId: ObjectId, userId: ObjectId) {
    const group = await Groups.findById(groupId);

    if (!group) {
        return [true, getResult('Group not found', 404)];
    }

    const isPresent = group.users.includes(userId);

    if (!isPresent) {
        return [true, getResult('user does not exist', 404)];
    }

    group.users.filter((user) => user !== userId);

    const updatedGroup = (await group.save()) as IGroup;

    return [
        false,
        getResult<IGroup>('user removed', 200, updatedGroup as IGroup),
    ];
}

export async function updateDescription(
    groupId: ObjectId,
    description: string,
) {
    const group = await Groups.findById(groupId);

    if (!group) {
        return [true, getResult('Group not found', 404)];
    }

    group.description = description;

    const updatedGroup = (await group.save()) as IGroup;

    if (!updatedGroup) {
        return [true, getResult('something went wrong', 403)];
    }

    return [
        false,
        getResult<IGroup>('succefully updated', 200, updatedGroup as IGroup),
    ];
}
