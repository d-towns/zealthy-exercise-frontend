import { useState } from "react";
import { CreateReplyThread } from "../models/replyThread.model";

const useReplyForm = (ticketId: string) => {
    const [replyForm, setReplyForm] = useState<CreateReplyThread>({ticketId} as CreateReplyThread);
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReplyForm({
        ...replyForm,
        [name]: value,
        });
    };
    
    return { replyForm, handleChange};
    }

export default useReplyForm;