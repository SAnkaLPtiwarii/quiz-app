import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import CreateCustomQuiz from './components/CreateCustomQuiz';
import './App.css';

function App() {
    return (
        <Router>
            <div className="container"> WELCOME!!!!!</div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/create-quiz" element={<CreateCustomQuiz />} />
            </Routes>
        </Router>
    );
}
export default App;