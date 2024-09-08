import React, { useState, useEffect } from 'react';

function Question({ question, onAnswer, timeLimit = 30 }) {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            onAnswer(false);
        }
    }, [timeLeft, onAnswer]);

    useEffect(() => {
        // Reset timer when question changes
        setTimeLeft(timeLimit);
    }, [question, timeLimit]);

    const getTimerColor = () => {
        if (timeLeft > 20) return 'green';
        if (timeLeft > 10) return 'orange';
        return 'red';
    };

    return (
        <div className="question-container fade-in">
            <h2 className="question-text" dangerouslySetInnerHTML={{ __html: question.question }} />
            <div className="timer" style={{ color: getTimerColor() }}>
                Time left: {timeLeft} seconds
            </div>
            <div className="answers-container">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        className="answer-button"
                        onClick={() => onAnswer(answer === question.correct_answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Question;