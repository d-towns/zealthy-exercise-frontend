import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    setEmail: (email: string | undefined) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    getEmail: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('email');
        const adminStatus = localStorage.getItem('isAdmin');

        setIsLoggedIn(!!email);
        setIsAdmin(adminStatus === 'true');
    }, []);

    const setEmail = (email: string | undefined) => {
        if (email) {
            localStorage.setItem('email', email);
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem('email');
            setIsLoggedIn(false);
        }
    };

    const getEmail = () => {
        return localStorage.getItem('email');
    }

    const toggleAdmin = (isAdmin: boolean) => {
        localStorage.setItem('isAdmin', String(isAdmin));
        setIsAdmin(isAdmin);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, setEmail, setIsAdmin: toggleAdmin, getEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
