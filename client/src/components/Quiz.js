import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Question from './Question';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const searchParams = new URLSearchParams(location.search);
            const difficulty = searchParams.get('difficulty') || 'easy';
            try {
                const { data } = await axios.get(`http://localhost:5000/api/quiz/questions?difficulty=${difficulty}`);
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [location]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    const handleHome = () => {
        navigate('/');
    };

    if (questions.length === 0) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="quiz-container fade-in">
            {showScore ? (
                <div className="score-section">
                    <h2>Quiz Completed!</h2>
                    <p>You scored {score} out of {questions.length}</p>
                    <button onClick={handleRetry}>Try Again</button>
                    <button onClick={handleHome}>Go to Home</button>
                </div>
            ) : (
                <>
                    <div className="quiz-header">
                        <h2>Question {currentQuestion + 1}/{questions.length}</h2>
                        <p>Score: {score}</p>
                    </div>
                    <Question
                        question={questions[currentQuestion]}
                        onAnswer={handleAnswer}
                    />
                </>
            )}
        </div>
    );
}

export default Quiz;