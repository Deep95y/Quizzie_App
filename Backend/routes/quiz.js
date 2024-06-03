// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const QuizData = require('../models/quizmodel');

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers['authorization']; 
        if (!headerToken) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        const decode = jwt.verify(headerToken, process.env.JWT_SECRET);

        req.userId = decode._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Something went wrong' });
    }
};

router.post('/createData', verifyToken, async (req, res) => {
    try {
        const { title, type, slides } = req.body;
        
        if (!title || !slides|| !type) {
            return res.status(400).json({ status: 'error', message: 'Title and slides are required' });
        }

        slides.forEach((slide, index) => { 
            if (!slide.Question || !slide.optionType || !slide.Timer) {
                throw new Error(`Slide ${index + 1} must have a question, optionType, and timer`);
            }

            if (slide.optionType === 'Text' && (!slide.TextData || !Array.isArray(slide.TextData.TextOption))) {
                throw new Error(`Slide ${index + 1}: For Text optionType, textData with TextOption array is required`);
            }

            if (slide.optionType === 'Image URL' && (!slide.ImageData || !Array.isArray(slide.ImageData.ImageOption))) {
                throw new Error(`Slide ${index + 1}: For Image URL optionType, imageData with ImageOption array is required`);
            }

            if (slide.optionType === 'Text & Image URL' && (!slide.TextImageData || !Array.isArray(slide.TextImageData.TextImageOption))) {
                throw new Error(`Slide ${index + 1}: For Text & Image URL optionType, textImageData with TextImageOption array is required`);
            }
        });
        const createQuiz = await QuizData.create({ 
            title: title,
            type: type,
            slides: slides,
        });

        res.json({ status: 'success', data: createQuiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message || 'Something went wrong' });
    }
});

router.delete('/deleteById/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const deleteQuiz = await QuizData.findByIdAndDelete(id);
        if (!deleteQuiz) {
            return res.status(404).json({ status: 'error', message: 'Quiz not found' });
        }
        res.json({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.get('/getQuizDataById/:id', async(req, res) => {  
    try{ 
        const id = req.params.id;
        const getData = await QuizData.findByIdAndUpdate(
            id,
            { $inc: { impressions: 1 } },
            { new: true }
          );
        res.json(getData); 
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.get('/GetQuizAnalysisSummary', verifyToken, async (req, res) => {
    try {
        const quizzes = await QuizData.find({}, {
          title: 1,
          type: 1,
          impressions: 1,
          createdAt: 1
        }).sort({ createdAt: -1 });
        res.json(quizzes);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
      }
});

router.get('/GetQuizAnalysisDetails/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getData = await QuizData.findById({_id: id });
        res.json(getData);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
      }
});

router.get('/GetQuizData', async (req, res) => {
  try {
      const getData = await QuizData.find({});
      res.json(getData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/incrementAttempt/:id/:slideIndex/:status', async (req, res) => {
    try {
      const quizId = req.params.id;
      const status = req.params.status;
      const slideIndex = parseInt(req.params.slideIndex);
  
      const query = { _id: quizId };
      const update = { $inc: {} };
      update.$inc[`slides.${slideIndex}.totalAttempt`] = 1;

      if (status === 'correct') {
        update.$inc[`slides.${slideIndex}.totalCorrectAttempt`] = 1;
      }
      const updatedQuiz = await QuizData.findOneAndUpdate(query, update, { new: true });

      res.json(updatedQuiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  router.put('/incrementPollAttempt/:id/:slideIndex/:optionIndex', async (req, res) => {
    try {
      const quizId = req.params.id;
      const slideIndex = parseInt(req.params.slideIndex);
      const optionIndex = parseInt(req.params.optionIndex);
  
      const query = { _id: quizId };
      const update = { $inc: {} };
      update.$inc[`slides.${slideIndex}.totalPollAttemmpts.${optionIndex}`] = 1;
  
      const updatedQuiz = await QuizData.findOneAndUpdate(query, update, { new: true });
  
      if (!updatedQuiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.json(updatedQuiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
  


router.patch('/editQuiz', verifyToken, async (req, res) => {
    try {
        const { id, title, slides } = req.body;

        const updatedQuiz = await QuizData.findByIdAndUpdate(id, { title, slides }, { new: true });

        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).send(updatedQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Something went wrong' });
    }
});

module.exports = router;

router.get('/getSummary', verifyToken, async (req, res) => {
    try {
      const keys = {
        impressions: 1,
        slides: 1
      };

      const quizzes = await QuizData.find({}, keys);
      var count_quiz = quizzes.length;
      var count_impressions = 0;
      var count_questions = 0;

      for (let i = 0; i < quizzes.length; i++) {
        count_impressions += quizzes[i].impressions;
        count_questions += quizzes[i].slides.length;
    }


      res.json({"count_quiz" : count_quiz, "count_impressions": count_impressions, "count_questions":count_questions});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
  