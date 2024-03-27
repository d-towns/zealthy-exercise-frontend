import React, { useState } from 'react';
import TicketService from '../services/ticket.service';
import { useParams } from 'react-router';
import { TicketSchema } from '../models/ticket.model';
import ReplyForm from '../components/ReplyForm';
import ReplyThreadCard from '../components/ReplyThread';
import TicketInfoCard from '../components/TicketInfoCard';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';

const TicketPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [ticket, setTicket] = useState<z.infer<typeof TicketSchema>>({} as z.infer<typeof TicketSchema>);
    const {isAdmin} = useAuth();

    React.useEffect(() => {
        const fetchTicket = async () => {
            if (!slug) return;
            const ticket = await TicketService.getTicketBySlug(slug);
            setTicket(ticket);
        }

        fetchTicket();
    }, []);

    return (
        <div className="container bg-gray-300  mt-12 mx-auto p-4 max-w-4xl rounded-lg shadow-lg">
            {ticket?.slug ?
                <>
                    <TicketInfoCard ticket={ticket} />
                    {ticket.Replies?.map(reply => (
                        <ReplyThreadCard key={reply.id} reply={reply} />
                    ))}
                    {isAdmin &&
                    <ReplyForm ticket={ticket} setTicket={setTicket}/>
}
                </>
                :
                <p>Loading...</p>
            }
        </div>
    );
};

export default TicketPage;