import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(1).max(30),
    description: z.string().min(10).max(255),
})