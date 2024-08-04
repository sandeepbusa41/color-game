import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavigationBar.module.css'; // Adjust path as needed
import { BalanceContext } from './balance'; // Adjust path as needed
import { UserContext } from '../navigations/Usercontext';

function NavigationBar() {
    const { user, logout } = useContext(UserContext);
    const { balance } = useContext(BalanceContext);
    const navigate = useNavigate(); // Use useNavigate

    const handleLogout = () => {
        logout();
        navigate('/login'); // Use navigate instead of history.push
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <NavLink className={styles.navLink} to="/">Register</NavLink>
                <NavLink className={styles.navLink} to="/login">Login</NavLink>
                <NavLink className={styles.navLink} to="/game">Game</NavLink>
                <NavLink className={styles.navLink} to="/deposit">Deposit</NavLink>
                <NavLink className={styles.navLink} to="/withdraw">Withdraw</NavLink>
            </div>
            {user.isLoggedIn && (
                <div className={styles.userActions}>
                    <span className={styles.username}>{user.username}</span>
                    <span className={styles.balance}>Bal: {balance}.00₹</span>
                    <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default NavigationBar;

