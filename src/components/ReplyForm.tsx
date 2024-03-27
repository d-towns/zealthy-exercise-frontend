import React from 'react';
import TicketService from '../services/ticket.service';
import useReplyForm from '../hooks/useReplyForm';
import { Ticket, TicketSchema } from '../models/ticket.model';
import {CreateReplyThreadSchema } from '../models/replyThread.model';
import { z } from 'zod';

interface ReplyFormProps {
    ticket: Ticket
    setTicket: React.Dispatch<React.SetStateAction<Ticket>>    
}

const ReplyForm: React.FC<ReplyFormProps> = ({ ticket , setTicket}: ReplyFormProps) => {
    const {
        replyForm,
        handleChange,
    } = useReplyForm(ticket?.id);
    const [error, setError] = React.useState<string | null>(null);
    const [newStatus, setNewStatus] = React.useState<z.infer<typeof TicketSchema>["status"] | null>(null);

    const handleReplySubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            console.log(replyForm)
            CreateReplyThreadSchema.parse(replyForm);
            const resposne = await TicketService.replyToTicket(ticket.id, { ...replyForm});
            console.log(resposne);
            setTicket({...ticket, Replies: [...ticket.Replies, resposne]});
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(error.errors[0].message);
            }
            console.error(error);
        }
    };

    const handleUpdateStatus = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const response = await TicketService.updateTicket(ticket.id, { status: newStatus || ticket.status});
            setTicket({...ticket, status: response.status});
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleReplySubmit} className="mt-6">
            <div className={'flex items-left max-w-sm flex-col my-5'}>
            <label className="font-medium mb-4">Update Ticket Status:</label>
            <select className="mb-4 p-2 border rounded-lg"  onChange={(e) => setNewStatus(e.target.value as z.infer<typeof TicketSchema>["status"])}>
                {TicketSchema.shape.status.options.map((status) => (
                    <option key={status} value={status} selected={ticket?.status === status}>{status}</option>
                ))}
            </select>
            <button
                type="submit"
                className="px-4 py-1 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleUpdateStatus}
            >
                Update Status
            </button>
            </div>
            <textarea
                className="w-full p-2 border rounded-lg"
                placeholder="Write your reply..."
                name="message"
                onChange={handleChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Submit Reply
            </button>
        </form>
    );
};

export default ReplyForm;