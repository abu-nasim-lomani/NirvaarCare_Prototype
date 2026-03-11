'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'customer' | 'caregiver' | 'admin' | 'partner' | null;
interface User { name: string; phone: string; role: Role; }

interface AuthCtx {
    user: User | null;
    role: Role;
    login: (phone: string, role: Role, name?: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthCtx>({
    user: null, role: null, login: () => { }, logout: () => { }, isLoggedIn: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (phone: string, role: Role, name = 'ব্যবহারকারী') => {
        setUser({ name, phone, role });
    };
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, role: user?.role ?? null, login, logout, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
