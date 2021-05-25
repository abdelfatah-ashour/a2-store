import React, { useState, createContext } from 'react';
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [Auth, setAuth] = useState({
        state: false,
        id: null,
        displayName: null,
        email: null,
        role: null,
    });
    return (
        <AuthContext.Provider value={{ Auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
