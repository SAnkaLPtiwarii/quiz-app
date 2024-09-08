import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const [difficulty, setDifficulty] = useState('easy');
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate(`/quiz?difficulty=${difficulty}`);
    };

    return (
        <div className="home">
            <h1 className="pulse">Welcome to the App Quiz</h1>
            <div className="quiz-options">
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button className="start-button pulse" onClick={handleStartQuiz}>Start Quiz</button>
            </div>
            <div className="create-quiz-link-container">
                <Link to="/create-quiz" className="create-quiz-link pulse">Create Custom Quiz</Link>
            </div>
        </div>
    );
}

export default Home;