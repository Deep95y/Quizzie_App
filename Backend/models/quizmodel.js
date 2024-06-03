// models/quizModel.js
const mongoose = require('mongoose');

const quizDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    enum: ['QnA', 'poll'],
    type: String,
    required: true,
  },
  impressions: {
    type: Number,
    default: 0
  },
  slides: [{
    Question: {
      type: String,
      required: true
    },
    optionType: {
      type: String,
      enum: ['Text', 'Image', 'TextImage'],
      required: true
    },
    Timer: {
      type: String,
      enum: ['Off', '5 sec', '10 sec'],
      default: 'Off'
    },
    totalAttempt: {
      type: Number,
      default: 0
    },
    totalCorrectAttempt: {
      type: Number,
      default: 0
    },
    totalPollAttemmpts: {
      type: [Number],
      default: [0,0,0,0]
    },
    TextData: { 
      TextOption: {
        type: [String],
        required: true
      },
      isCorrect: {
        type: Number,
        required: false
      }
    },
    ImageData: {
      ImageOption: {
        type: [String],
        required: true
      },
      isCorrect: {
        type: Number,
        required: false
      }
    },
    TextImageData: {
      TextImageOption: {
        type: [{
          text: {
            type: String,
            default: ''
          },
          imageUrl: {
            type: String,
            default: ''
          }
        }],
        required: true
      }
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const QuizData = mongoose.model('QuizData', quizDataSchema);

module.exports = QuizData;
