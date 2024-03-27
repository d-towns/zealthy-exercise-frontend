import { CreateReplyThread } from "../models/replyThread.model";
import { CreateTicket, UpdateTicket } from "../models/ticket.model";
import axiosInstance from "./axios";

class TicketService {
    static async getTickets() {
        try {
            const response = await axiosInstance.get("/tickets");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getTicketBySlug(slug: string) {
        try {
            const response = await axiosInstance.get(`/tickets/${slug}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async updateTicket(ticketId:string, ticket: UpdateTicket) {
        try {
            const response = await axiosInstance.put(`/tickets/${ticketId}`, ticket);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async createTicket(ticket: CreateTicket) {
        try {
            const response = await axiosInstance.post("/tickets/create", ticket);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async replyToTicket(ticketId: string, reply: CreateReplyThread) {
        try {
            const response = await axiosInstance.post(`/tickets/${ticketId}/reply`, reply);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default TicketService;