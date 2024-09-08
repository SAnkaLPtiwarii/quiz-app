const express = require('express');
const axios = require('axios');
const router = express.Router();
const CustomQuiz = require('../models/CustomQuiz');

router.get('/questions', async (req, res) => {
    try {
        const { difficulty = 'easy' } = req.query;
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`);
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

router.post('/custom', async (req, res) => {
    try {
        const { title, questions } = req.body;
        const customQuiz = new CustomQuiz({
            title,
            creator: req.user.id, // Assuming you have authentication middleware
            questions
        });
        await customQuiz.save();
        res.status(201).json(customQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Error creating custom quiz' });
    }
});

router.get('/custom/:id', async (req, res) => {
    try {
        const customQuiz = await CustomQuiz.findById(req.params.id);
        if (!customQuiz) {
            return res.status(404).json({ message: 'Custom quiz not found' });
        }
        res.json(customQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching custom quiz' });
    }
});

module.exports = router;