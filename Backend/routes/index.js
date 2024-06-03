// routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const dataRoutes = require('./data');
const quizRoutes = require('./quiz');
const attemptRoutes = require('./attempt');

router.use('/auth', authRoutes);
router.use('/data', dataRoutes);
router.use('/quiz', quizRoutes);
router.use('/attempts', attemptRoutes);

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

module.exports = router;
