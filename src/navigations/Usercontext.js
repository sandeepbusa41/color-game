import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: '',
    });

    const login = (username) => {
        const userBalance = parseInt(localStorage.getItem(`${username}_balance`), 10) || 0;
        const depositHistory = JSON.parse(localStorage.getItem(`${username}_depositHistory`)) || [];
        const withdrawHistory = JSON.parse(localStorage.getItem(`${username}_withdrawHistory`)) || [];
        
        setUser({ 
            isLoggedIn: true, 
            username,
            balance: userBalance,
            depositHistory,
            withdrawHistory
        });
    };

    const logout = () => {
        setUser({ isLoggedIn: false, username: '' });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
