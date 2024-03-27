import { ReplyThread } from "../models/replyThread.model";

interface ReplyThreadProps {
    reply: ReplyThread
}

const ReplyThreadCard: React.FC<ReplyThreadProps> = ({ reply }: ReplyThreadProps) => {

    return (
        <div className="bg-gray-100 my-4 rounded shadow-lg p-4 w-full">
            <div className="flex justify-left gap-5  items-center mb-2">
                <span className={`text-sm font-semibold px-2 py-1 rounded ${reply.isInternal ? 'bg-green-500' : 'bg-red-500'
                    } text-black`}>
                    {reply.isInternal ? 'Internal' : 'External'}
                </span>
                <p className="text-black text-opacity-80">
                    {reply.userEmail} @ {new Date(reply.createdAt).toLocaleString()}
                </p>
                <p className="text-black text-opacity-80">

                </p>

            </div>
            <div className="mb-2">
                <p className="text-lg text-black">
                    {reply.message}
                </p>
            </div>
        </div>
    );
}

export default ReplyThreadCard;