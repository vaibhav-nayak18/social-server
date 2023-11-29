import { AnyZodObject } from "zod";

type validateType<T> = {
  isError: boolean;
  message: string;
  verifiedData: T;
};

/** This function validate user input in runtime and ensure all the data is valid */
export function validateInput<T>(
  input: T,
  schema: AnyZodObject,
): validateType<T> {
  const result = schema.safeParse(input);

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
