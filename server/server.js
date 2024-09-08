const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/quiz', quizRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;