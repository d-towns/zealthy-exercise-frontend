import React, { useState } from 'react';
import TicketService from '../services/ticket.service';
import useReplyForm from '../hooks/useReplyForm';
import { TicketSchema } from '../models/ticket.model';
import { z } from 'zod';

interface ReplyFormProps {
    ticketId: string;
}
// Better error handling on the form submission

const ReplyForm: React.FC<ReplyFormProps> = ({ ticketId }: ReplyFormProps) => {
    const {
        replyForm,
        handleChange,
        setNewStatus,
        newStatus,
    } = useReplyForm(ticketId);

    const handleReplySubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            await TicketService.replyToTicket(ticketId, { ...replyForm, newStatus });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleReplySubmit} className="mt-6">
            <label className="font-medium mr-4">Update Ticket Status:</label>
            <select className="mb-4 p-2 border rounded-lg" onChange={(e) => setNewStatus(e.target.value as z.infer<typeof TicketSchema>["status"])}>
                {TicketSchema.shape.status.options.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <textarea
                className="w-full p-2 border rounded-lg"
                placeholder="Write your reply..."
                name="message"
                onChange={handleChange}
            />
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