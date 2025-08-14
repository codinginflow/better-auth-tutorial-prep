import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.email({ message: "Enter a valid email" }),
});

export type ProfileValues = z.infer<typeof profileSchema>;
