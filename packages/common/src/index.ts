import { z } from "zod";

export const SignUpSchema = z.object({
    email: z.string().min(4).max(40),
    password: z.string(),
    name: z.string()
})
export const SignInSchema = z.object({
    email: z.string().min(4).max(40),
    password: z.string(),
})
export const CreateRoomSchema = z.object({
    slug: z.string()
})