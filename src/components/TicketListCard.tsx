import React from "react";
import { Ticket } from "../models/ticket.model";
import { Link } from "react-router-dom";

interface TicketListCardProps {
  ticket: Ticket
}

const TicketListCard: React.FC<TicketListCardProps> = ({ ticket }: TicketListCardProps) => {
  const { title, status, description, slug} = ticket
  return (
    <Link to={`/ticket/${slug}`}>
    <div className="bg-gray-600 m-4 rounded shadow-lg p-4 w-full">
      <div className="flex justify-left gap-5  items-center mb-2">
        <span className={`text-sm font-semibold px-2 py-1 rounded ${status === 'new' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
          {status}
        </span>
        <p className="text-lg text-white font-bold">
          {title}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-white text-opacity-80">
          {description}
        </p>
      </div>

    </div>
    </Link>
  );
};

export default TicketListCard;