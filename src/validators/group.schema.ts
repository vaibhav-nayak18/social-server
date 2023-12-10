import * as z from "zod";

export const groupSchema = z.object({
  group_name: z
    .string({ required_error: "Group name is required" })
    .min(5, "Group name should be 5 or more characters")
    .max(10, "Group name should be 10 or less characters"),
  category: z
    .string({ required_error: "Category is required" })
    .min(6, "Category should be 6 or more characters")
    .max(20, "Category should be 20 or less characters"),
});

export const messageSchema = z.object({
  message: z
    .string({ required_error: "Message should not be empty" })
    .min(1, "message shouldn't be empty")
    .max(50, "character limit exceeded. limit is 80"),
});
