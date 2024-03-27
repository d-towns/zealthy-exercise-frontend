import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// explain why we use useRef here

const LoginPage : React.FC = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const isAdminRef = useRef<HTMLInputElement>(null);
    const { setEmail, setIsAdmin } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const email = emailRef.current?.value;
            const isAdmin = isAdminRef.current?.checked;
            setEmail(email);
            setIsAdmin(isAdmin || false);
            isAdmin ? navigate('/admin') : navigate('/ticket/create');
        } catch (e) {
            console.log(e);
            return;
        }
    }            

    return (
        <div className="flex h-screen items-center justify-center bg-brutalist-gray-dark">
            <div className="bg-brutalist-gray border border-brutalist-metal-dark shadow-xl p-8 max-w-sm w-full rounded-lg">
                <h1 className="text-white text-3xl text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-white mb-2">Email</label>
                        <input ref={emailRef} placeholder='Email' type='email' className="w-full px-3 rounded-lg py-2 bg-white text-black border border-brutalist-metal-light focus:outline-none focus:border-brutalist-red-dark" />
                    </div>
                    <div>
                        <label htmlFor="isAdmin" className="block text-white mb-2">
                            <input type="checkbox" ref={isAdminRef} name="isAdmin" id="isAdmin" className="mr-2" />
                            Admin
                        </label>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-gray-200  rounded-lg">
                            Log In
                        </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
