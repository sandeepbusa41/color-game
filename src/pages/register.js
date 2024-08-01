import React, { useState, useContext } from 'react';
import NavigationBar from "../components/navbar";
import styles from './Register.module.css';

import { BalanceContext } from '../components/balance'; // Adjust path as needed
import { UserContext } from '../navigations/Usercontext';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const { login } = useContext(UserContext);
    const { setBalance } = useContext(BalanceContext);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (localStorage.getItem(formData.username)) {
            newErrors.username = 'Username already exists';
        }

        if (!formData.age || isNaN(formData.age) || formData.age < 18) {
            newErrors.age = 'Please enter a valid age (18 or older)';
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!formData.phone || !phonePattern.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            localStorage.setItem(formData.username, JSON.stringify({ 
                username: formData.username, 
                password: formData.password 
            }));
            setBalance(0); // Initialize balance to 0
            login(formData.username); // Log in the user
            setSuccessMessage('Registration successful!');
            setFormData({
                username: '',
                age: '',
                gender: '',
                phone: '',
                email: '',
                password: '',
            });
            setErrors({});
        } else {
            setErrors(validationErrors);
            setSuccessMessage('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <NavigationBar />
            <div className={styles.container}>
                <h1>Register</h1>
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
                        {errors.username && <span className={styles.error}>{errors.username}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.age && <span className={styles.error}>{errors.age}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
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
                        {errors.password && <span className={styles.error}>{errors.password}</span>}
                    </div>
                    <button type="submit" className={styles.submitButton}>Register</button>
                </form>
                {successMessage && <div className={styles.success}>{successMessage}</div>}
            </div>
        </>
    );
}

export default Register;

