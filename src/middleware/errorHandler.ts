import { Response } from 'express';
export class HttpException extends Error {
    statusCode: number;
    message: string;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const errorHandler = (error: HttpException, res: Response): void => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).send({
        statusCode,
        message,
    });
};

export function getResult(
    message: string,
    statusCode: number,
    data?: unknown,
): { statusCode: number; message: string; data: unknown } {
    return {
        message: message || 'something went wrong',
        statusCode: statusCode || 500,
        data: data || undefined,
    };
}
