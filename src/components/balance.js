import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from '../navigations/Usercontext';

const BalanceContext = createContext();

const BalanceProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [balance, setBalance] = useState(user.balance || 0);

    useEffect(() => {
        if (user.isLoggedIn) {
            localStorage.setItem(`${user.username}_balance`, balance);
        }
    }, [balance, user]);

    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {children}
        </BalanceContext.Provider>
    );
};

export { BalanceContext, BalanceProvider };

