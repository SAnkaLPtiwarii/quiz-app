const mongoose = require('mongoose');

const CustomQuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questions: [{
        question: String,
        correct_answer: String,
        incorrect_answers: [String]
    }]
});

module.exports = mongoose.model('CustomQuiz', CustomQuizSchema);