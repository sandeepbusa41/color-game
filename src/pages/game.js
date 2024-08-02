import NavigationBar from "../components/navbar";
import React, { useState, useEffect, useContext } from 'react';

import './Game.css';
import { BalanceContext } from "../components/balance";

function Game() {
    const [number, setNumber] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const { balance, setBalance } = useContext(BalanceContext);
    
    const generateRandomOutcomes = () => {
        const colors = ['green', 'red', 'violet'];
        const randomOutcomes = Array.from({ length: 10 }, () => {
            const randomNumber = Math.floor(Math.random() * 10);
            const generatedColor = randomNumber === 0 || randomNumber === 5 ? 'violet' : randomNumber % 2 === 0 ? 'green' : 'red';
            return {
                number: randomNumber,
                generatedColor: generatedColor,
                userGuess: colors[Math.floor(Math.random() * colors.length)],
                isCorrect: Math.random() < 0.5 // Randomly decide if the guess was correct
            };
        });
        return randomOutcomes;
    };

    const [outcomes, setOutcomes] = useState(() => {
        const savedOutcomes = localStorage.getItem('outcomes');
        return savedOutcomes ? JSON.parse(savedOutcomes) : generateRandomOutcomes();
    });

    const [userGuess, setUserGuess] = useState(null);
    const [betAmount, setBetAmount] = useState(0);
    const [iter, setIter] = useState(0);
    const [resultMessage, setResultMessage] = useState('');

    useEffect(() => {
        const generateNumber = () => {
            const randomNumber = Math.floor(Math.random() * 10);
            setNumber(randomNumber);
        };

        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    handleOutcome();
                    generateNumber();
                    setIter(prevIter => prevIter + 1);
                    return 20;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        generateNumber();

        return () => clearInterval(timer);
    }, [userGuess, iter]);

    useEffect(() => {
        localStorage.setItem('outcomes', JSON.stringify(outcomes));
    }, [outcomes]);

    const getColor = () => {
        if (number === 0 || number === 5) {
            return 'violet';
        }
        return number % 2 === 0 ? 'green' : 'red';
    };

    const handleGuess = (color) => {
        const amount = prompt("Enter your bet amount:");
        if (amount && !isNaN(amount) && amount > 0) {
            const betAmount = parseInt(amount, 10);
            if (betAmount <= balance) {
                setUserGuess(color);
                setBetAmount(parseInt(amount, 10));
                setBalance(balance - betAmount);
            } else {
                alert("You don't have enough balance to place this bet.");
            }
        } else {
            alert("Please enter a valid amount.");
        }
    };

    const handleOutcome = () => {
        const generatedColor = getColor();
        let newBalance = balance;

        if (userGuess && betAmount > 0) {
            const isCorrect = userGuess === generatedColor;
            newBalance = isCorrect ? (userGuess === 'violet' ? balance + 3 * betAmount : balance + 2 * betAmount) : balance;
            setBalance(newBalance);

            const result = isCorrect ? (userGuess === 'violet' ? `🎉 Congrats, you won ${3 * betAmount}!` : `🎉 Congrats, you won ${2 * betAmount}!`) : `😞 You lost ${betAmount}.`;
            setResultMessage(result);

            setTimeout(() => {
                setResultMessage('');
            }, 2000);
        }

        const newOutcome = {
            number,
            generatedColor,
            userGuess,
            isCorrect: userGuess ? userGuess === generatedColor : null
        };

        setOutcomes(prevOutcomes => {
            const updatedOutcomes = [newOutcome, ...prevOutcomes];
            if (updatedOutcomes.length > 10) {
                updatedOutcomes.pop();
            }
            return updatedOutcomes;
        });

        setUserGuess(null);
        setBetAmount(0);
    };

    return (
        <React.Fragment>
            <NavigationBar />
            <div className="container">
                <div className="countdown">Countdown: {countdown}</div>
                <div className="guess-buttons">
                    <button className="guess-button green" onClick={() => handleGuess('green')}>Green</button>
                    <button className="guess-button red" onClick={() => handleGuess('red')}>Red</button>
                    <button className="guess-button violet" onClick={() => handleGuess('violet')}>Violet</button>
                </div>
                {resultMessage && <div className="result-message">{resultMessage}</div>}
                <div className="outcomes">
                    <div className="outcome-header">
                        <span>S.No</span>
                        <span>NUMBER</span>
                        <span>COLOR</span>
                    </div>
                    {outcomes.map((outcome, index) => (
                        <div key={index} className={`outcome ${outcome.isCorrect === true ? 'correct' : outcome.isCorrect === false ? 'incorrect' : ''}`}>
                            <span>{index + 1}</span>
                            <span className={`number ${outcome.generatedColor}`}>{outcome.number}</span>
                            <span className="color-circle" style={{ backgroundColor: outcome.generatedColor }}></span>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Game;

