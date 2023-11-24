import mongoose from "mongoose";
import * as z from "zod";

export const groupSchema = z.object({
  id: z
    .string({ description: "Admin id is required" })
    .refine(
      (val) => mongoose.Types.ObjectId.isValid(val),
      "This is not a valid id",
    ),
  group_name: z
    .string({ description: "Group name is required" })
    .min(5, "Group name should be 5 or more characters")
    .max(10, "Group name should be 10 or less characters"),
});
