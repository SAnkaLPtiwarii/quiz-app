const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const CustomQuiz = require('../models/CustomQuiz');

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/quiz/questions', () => {
    it('should return 10 questions', async () => {
        const res = await request(app).get('/api/quiz/questions');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(10);
    });

    it('should return questions with the correct difficulty', async () => {
        const res = await request(app).get('/api/quiz/questions?difficulty=hard');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].difficulty).toEqual('hard');
    });
});

describe('POST /api/quiz/custom', () => {
    it('should create a new custom quiz', async () => {
        const newQuiz = {
            title: 'Test Quiz',
            questions: [
                {
                    question: 'What is 2 + 2?',
                    correct_answer: '4',
                    incorrect_answers: ['3', '5', '6']
                }
            ]
        };

        const res = await request(app)
            .post('/api/quiz/custom')
            .send(newQuiz);

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual('Test Quiz');
        expect(res.body.questions.length).toEqual(1);
    });
});