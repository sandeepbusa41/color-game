import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/navbar';
import styles from './Login.module.css';
import { BalanceContext } from '../components/balance';
import { UserContext } from '../navigations/Usercontext';

function Login() {
    const { login } = useContext(UserContext);
    const { setBalance } = useContext(BalanceContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formData;
        const storedUser = JSON.parse(localStorage.getItem(username));

        if (storedUser && storedUser.password === password) {
            login(username);
            setBalance(parseInt(localStorage.getItem(`${username}_balance`), 10) || 0);
            navigate('/game');
        } else {
            setErrors('Invalid username or password');
            setLoginFailed(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (loginFailed) {
            setLoginFailed(false);
        }
    };

    return (
        <>
            <NavigationBar />
            <div className={styles.container}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Login</button>
                    {errors && <div className={styles.error}>{errors}</div>}
                    {loginFailed && (
                        <div className={styles.suggestion}>
                            Username not found. <a href="/register">Go to Register</a>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default Login;

