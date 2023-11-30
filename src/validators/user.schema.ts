import * as z from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .min(6, "Minimum character length for username is 6")
    .max(12, "Maximum character length for username is 12"),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, "Minimum character length for password is 6")
    .max(12, "Maximum character length for password is 12"),
});

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "email is required" })
      .email("Invalid email formate"),
  })
  .merge(loginSchema);
