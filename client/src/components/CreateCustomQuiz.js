import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCustomQuiz() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', correct_answer: '', incorrect_answers: ['', '', ''] }]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/quiz/custom', { title, questions });
            alert('Custom quiz created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating custom quiz:', error);
        }
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', correct_answer: '', incorrect_answers: ['', '', ''] }]);
    };

    const updateQuestion = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const updateIncorrectAnswer = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].incorrect_answers[answerIndex] = value;
        setQuestions(updatedQuestions);
    };

    return (
        <div className="create-quiz-container">
            <form className="create-quiz-form" onSubmit={handleSubmit}>
                <h2>Create Your Custom Quiz</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Quiz Title"
                    required
                />
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="question-group">
                        <h3>Question {qIndex + 1}</h3>
                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                            placeholder="Question"
                            required
                        />
                        <input
                            type="text"
                            value={q.correct_answer}
                            onChange={(e) => updateQuestion(qIndex, 'correct_answer', e.target.value)}
                            placeholder="Correct Answer"
                            required
                        />
                        {q.incorrect_answers.map((a, aIndex) => (
                            <input
                                key={aIndex}
                                type="text"
                                value={a}
                                onChange={(e) => updateIncorrectAnswer(qIndex, aIndex, e.target.value)}
                                placeholder={`Incorrect Answer ${aIndex + 1}`}
                                required
                            />
                        ))}
                    </div>
                ))}
                <button type="button" onClick={addQuestion} className="add-question-btn">Add Question</button>
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
}

export default CreateCustomQuiz;