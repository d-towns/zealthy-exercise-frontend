import { Ticket } from "../models/ticket.model";

const TicketInfoCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
    const { title, status, description } = ticket;
    return (
        <div className="border-b pb-2">
            <h1 className="text-2xl font-semibold border-b pb-2 mb-4">Ticket Details</h1>
            <div className="mb-4">
                <p> From  <span className="font-semibold"> {ticket.email}</span> @ {new Date(ticket.createdAt).toLocaleString()}
                    </p>                
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-700 mt-1">{description}</p>
            </div>
            <div>
                <label className="font-medium">Status:</label>
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${status === 'new' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    );
}

export default TicketInfoCard;