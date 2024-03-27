import { useState } from "react";
import { CreateTicketSchema } from "../models/ticket.model";
import {z} from 'zod';
import { useAuth } from "../context/AuthContext";

const useTicketForm = () => {
  const {getEmail } = useAuth();
  const [ticketForm, setTicketForm] = useState<z.infer<typeof CreateTicketSchema>>({email: getEmail(), status: 'new'} as z.infer<typeof CreateTicketSchema>);


  const handleChange : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketForm({
      ...ticketForm,
      [name]: value,
    });
  };

  return { ticketForm, handleChange };
};

export default useTicketForm;