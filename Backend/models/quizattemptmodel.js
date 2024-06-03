const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const attemptSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId,
    },
    title : {
         type: String,
        required : true  
    },
    impressions: {
        type: Number,
        default: 0
    }, 
    questionStats: 
        [ 
            {
                Question: {
                    type: String,
                    required: true
                },
                atttempts: {
                    type: Number,
                    default: 0
                }
            }
        ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Attempt = model('Attempt', attemptSchema);

module.exports = Attempt;
