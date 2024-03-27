import React from "react";
import TicketService from "../services/ticket.service";
import TicketListCard from "../components/TicketListCard";
import { TicketSchema } from "../models/ticket.model";
import {z} from 'zod';

const DashboardPage : React.FC = () => {

    const [tickets, setTickets] = React.useState<z.infer<typeof TicketSchema>[]>([]);

    React.useEffect(() => {
        TicketService.getTickets().then((data) => {
            setTickets(data);
        });
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div>
                {tickets.map((ticket) => (
                    <TicketListCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;