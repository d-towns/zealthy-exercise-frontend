import React, { FormEvent } from "react";
import { CreateTicketSchema } from "../models/ticket.model";
import TicketService from "../services/ticket.service";
import { useNavigate } from "react-router";
import useTicketForm from "../hooks/useTicketForm";

const TicketForm: React.FC = () => {

    const {ticketForm , handleChange} = useTicketForm();
    const navigate = useNavigate();
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            CreateTicketSchema.parse(ticketForm)
            const repsonse = await TicketService.createTicket(ticketForm)
            navigate(`/ticket/${repsonse?.slug}`)
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <form onSubmit={ (e) => handleSubmit(e)}  className="flex mx-5 rounded-lg flex-col gap-4 p-4 bg-brutalist-gray-light border border-brutalist-metal shadow-lg max-w-5xl mx-auto">
        <div>
            <label htmlFor='email' className="block text-white mb-2">Email</label>
            <input id="email" name="email" className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg" value={ticketForm.email} onChange={handleChange} />
            {/* {validationErrors?.email && <p className="text-red-500 my-3 ">{validationErrors.email}</p>} */}
        </div>
        <div>
            <label htmlFor="title" className="block text-white mb-2">Title</label>
            <input id="title" name="title" className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg" value={ticketForm.title} onChange={handleChange} />
            {/* {validationErrors?.title && <p className="text-red-500 my-3 ">{validationErrors.title}</p>} */}
        </div>
        <div>
            <label htmlFor="description" className="block text-white mb-2">Description</label>
            <textarea id="description" name="description" className="w-full h-[400px] px-3 py-2 bg-white text-gray-800 rounded-lg" value={ticketForm.description} onChange={handleChange}/>
            {/* {validationErrors?.description && <p className="text-red-500 my-3 ">{validationErrors.description}</p>} */}
        </div>
        <button type="submit" className="px-4 py-2 bg-gray-200  rounded-lg">Submit Ticket</button>
    </form>
    );
}

export default TicketForm;