import { z } from 'zod';
import { ReplyThread, ReplyThreadSchema } from './replyThread.model';

export const TicketSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    status: z.enum(["new", "in-progress", "resolved"]),
    createdAt: z.string(),
    updatedAt: z.string(),
    Replies: z.array(ReplyThreadSchema),
});

export const CreateTicketSchema = TicketSchema.omit({ id: true, createdAt: true, updatedAt: true, Replies: true, slug: true});
// update scheme should be able to have any of the fields
export const UpdateTicketSchema = TicketSchema.partial()

export type Ticket = z.infer<typeof TicketSchema>;
export type CreateTicket = z.infer<typeof CreateTicketSchema>;
export type UpdateTicket = z.infer<typeof UpdateTicketSchema>;