import { AnyZodObject, z } from 'zod';

export function validateInput(input: unknown, schema: AnyZodObject) {
    type returnType = z.infer<typeof schema>;
    const result = schema.safeParse(input);
    if (result.success) {
        return {
            isError: false,
            userInput: result.data as returnType,
            message: 'success',
        };
    }

    return {
        isError: true,
        message: result.error.errors[0].message,
        userInput: input,
    };
}
