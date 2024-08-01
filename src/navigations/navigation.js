import React from 'react';
import { BrowserRouter as BrowserRoutes, Routes, Route } from 'react-router-dom';
import Register from '../pages/register';
import Login from '../pages/login';
import Game from '../pages/game';
import Deposite from '../pages/deposite';
import Invalid from '../pages/invalid';
import Withdraw from '../pages/withdraw';
import { BalanceProvider } from '../components/balance';
import { UserProvider } from './Usercontext';

function Navigation() {
    return (
        
        <BrowserRoutes>
        <UserProvider>
        <BalanceProvider>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/game" element={<Game />} />
                <Route path="/deposit" element={<Deposite />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="*" element={<Invalid/>}/>
            </Routes>
            
            </BalanceProvider>
            </UserProvider>
        </BrowserRoutes>
       
    );
}

export default Navigation;

