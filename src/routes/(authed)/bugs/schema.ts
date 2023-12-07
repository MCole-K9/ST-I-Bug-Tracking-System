import { BugPriority, BugSeverity, BugStatus } from "@prisma/client";
import { z } from "zod";

export const createBugSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(50),
    project_id: z.string(),
    user_id: z.string(),
    status: z.enum([BugStatus.OPEN, BugStatus.CLOSED, BugStatus.IN_PROGRESS]).optional(),
    priority: z.enum([BugPriority.LOW, BugPriority.MEDIUM, BugPriority.HIGH, BugPriority.TBD]).default(BugPriority.TBD).optional(),
    severity: z.enum([BugSeverity.LOW, BugSeverity.BLOCKER, BugSeverity.CRITICAL, BugSeverity.MAJOR, BugSeverity.MINOR, BugSeverity.TBD]).optional(),
})


export type CreateBugSchemaType = z.infer<typeof createBugSchema>;

export const updateBugSchema = z.object({
    name: createBugSchema.shape.name.optional(),
    description: createBugSchema.shape.description.optional(),
    project_id: createBugSchema.shape.project_id.optional(),
    user_id: createBugSchema.shape.user_id.optional(),
    status: createBugSchema.shape.status,
    priority: createBugSchema.shape.priority,
    severity: createBugSchema.shape.severity,
})

export type UpdateBugSchemaType = z.infer<typeof updateBugSchema>;