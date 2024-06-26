import {z} from 'zod';

export const ReplyThreadSchema = z.object({
    id: z.string(),
    ticketId: z.string(),
    replyParentId: z.string().nullable(),
    userEmail: z.string().optional(),
    message: z.string(),
    isInternal: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const CreateReplyThreadSchema = z.object({
    ticketId: z.string(),
    message: z.string(),
    userEmail: z.string().optional(),
});


export type CreateReplyThread = z.infer<typeof CreateReplyThreadSchema>;
export type ReplyThread = z.infer<typeof ReplyThreadSchema>;