import React, { useContext, useState, useEffect } from "react";
import NavigationBar from "../components/navbar";
import { BalanceContext } from "../components/balance";
import { UserContext } from "../navigations/Usercontext";
import styles from './Withdraw.module.css';

function Withdraw() {
    const { user } = useContext(UserContext);
    const { balance, setBalance } = useContext(BalanceContext);
    const [amount, setAmount] = useState(0);
    const [history, setHistory] = useState(user.withdrawHistory||[]);

    const handleWithdraw = () => {
        if (amount > 0) {
            if (amount <= balance) {
                const withdrawAmount = parseInt(amount, 10);
                setBalance(prevBal => prevBal - withdrawAmount);

                const newEntry = {
                    amount: withdrawAmount,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                };

                const updatedHistory = [newEntry, ...history];
                setHistory(updatedHistory);
                localStorage.setItem(`${user.username}_withdrawHistory`, JSON.stringify(updatedHistory));
                setAmount(0);
            } else {
                alert('Insufficient balance');
            }
        } else {
            alert('Enter a positive amount');
        }
    };

    useEffect(() => {
        localStorage.setItem(`${user.username}_balance`, balance);
    }, [balance, user.username]);

    return (
        <>
            <NavigationBar />
            <div className={styles.container}>
                <h1>Withdraw</h1>
                <label>Enter amount:</label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleWithdraw}>Withdraw</button>

                <div className={styles.history}>
                    <h2>Withdraw History</h2>
                    {history.map((entry, index) => (
                        <div key={index} className={styles.historyItem}>
                            <div>
                                <span className={styles.historyDate}>{entry.date}</span>
                                <span className={styles.historyTime}>{entry.time}</span>
                            </div>
                            <div className={styles.historyAmount}>₹{entry.amount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Withdraw;

