const express = require('express');
const router = express.Router();
const Attempt = require('../models/quizattemptmodel');
const QuizData = require('../models/quizmodel'); // Adjust the path if necessary
 
router.get('/quizStatistics', async (req, res) => {
    try {
        const totalQuiz = await QuizData.countDocuments();
        const totalQuestions = await QuizData.aggregate([
            { $unwind: '$slides' }, 
            { $count: 'totalQuestions' }
        ]);

        res.status(200).send({
            totalQuiz,
            totalQuestions: totalQuestions[0] ? totalQuestions[0].totalQuestions : 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Something went wrong" });
    }
});

router.post('/quizImpressions', async (req, res) => {
    try {
        const { id: quizId } = req.body;
        const quiz = await QuizData.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        quiz.impressions += 1;
        await quiz.save();
        res.status(200).json({
            message: 'Impression recorded',
            impressions: quiz.impressions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Something went wrong' });
    }
});

router.get('/analysis/:id', async (req, res) => {
    try {
        const { id: quizId } = req.params;
        const attemptQuiz = await Attempt.find({ quizId }).populate('userId');
        if (!attemptQuiz.length) {
            return res.status(404).json({ message: "No attempts found for this quiz" });
        }
        let totalAttempts = attemptQuiz.length;
        let questionStats = {};
        attemptQuiz.forEach(attempt => {
            attempt.results.forEach(result => {
                if (!questionStats[result.question]) {
                    questionStats[result.question] = {
                        attempts: 0,
                        correct: 0,
                        wrong: 0
                    };
                }
                questionStats[result.question].attempts++;
                if (result.isCorrect) {
                    questionStats[result.question].correct++;
                } else {
                    questionStats[result.question].wrong++;
                }
            });
        });
        res.status(200).json({ totalAttempts, questionStats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/quizAttempt', async (req, res) => {
    try {
        const { userId, quizId, results } = req.body;
        const newAttempt = new Attempt({
            userId,
            quizId,
            results
        });
        await newAttempt.save();
        res.status(201).send(newAttempt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
