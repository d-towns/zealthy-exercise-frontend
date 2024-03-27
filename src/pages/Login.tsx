import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { z } from 'zod';

const LoginFormSchema = z.object({
    email: z.string().email(),
    isAdmin: z.boolean()
});

const LoginPage : React.FC = () => {

    const [loginForm, setLoginForm] = useState({email: '', isAdmin: false})
    const { setEmail, setIsAdmin } = useAuth();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(loginForm);
            LoginFormSchema.parse(loginForm);
            setEmail(loginForm.email);
            setIsAdmin(loginForm.isAdmin || false);
            loginForm.isAdmin ? navigate('/admin') : navigate('/ticket/create');
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors[0].message);
            }
            console.log(e);
            return;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'isAdmin') {
            setLoginForm({...loginForm, [e.target.name]: e.target.checked})
            return;
        }
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    return (
        <div className="flex h-screen items-center justify-center bg-brutalist-gray-dark">
            <div className="bg-brutalist-gray border border-brutalist-metal-dark shadow-xl p-8 max-w-sm w-full rounded-lg">
                <h1 className="text-white text-3xl text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-white mb-2">Email</label>
                        <input onChange={handleChange} placeholder='Email' name='email' type='email' className="w-full px-3 rounded-lg py-2 bg-white text-black border border-brutalist-metal-light focus:outline-none focus:border-brutalist-red-dark" />
                    </div>
                    <div>
                        <label htmlFor="isAdmin" className="block text-white mb-2">
                            <input type="checkbox" onChange={handleChange} name="isAdmin" id="isAdmin" className="mr-2" />
                            Admin
                        </label>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full px-4 py-2 bg-gray-200  rounded-lg">
                            Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
