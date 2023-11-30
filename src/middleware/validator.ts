import { AnyZodObject } from "zod";

type validateType<T> = {
  isError: boolean;
  message: string;
  verifiedData: T;
};

/** This function validate user input in runtime and ensure all the data is valid */
export async function validateInput<T>(
  input: T,
  schema: AnyZodObject,
): Promise<validateType<T>> {
  const result = await schema.safeParseAsync(input);

  if (result.success) {
    return {
      isError: false,
      message: "Success",
      verifiedData: result.data as T,
    };
  }

  return {
    isError: true,
    message: result.error.errors[0].message,
    verifiedData: input as T,
  };
}
