import React from 'react';
import TicketForm from '../components/TicketForm';

const CreateTicketPage: React.FC = () => {

    return (
        <>
            <h1 className="text-2xl text-center text-white my-5 font-semibold">Create Support Ticket</h1>
            <TicketForm />
        </>
    )
}

export default CreateTicketPage