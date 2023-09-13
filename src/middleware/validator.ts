import { AnyZodObject } from 'zod';

export function validateInput<T>(input: unknown, schema: AnyZodObject) {
    const result = schema.safeParse(input);
    if (result.success) {
        return {
            isError: false,
            userInput: result.data as T,
            message: 'success',
        };
    }

    return {
        isError: true,
        message: result.error.errors[0].message,
        userInput: input as T,
    };
}
