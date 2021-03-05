const express = require('express');
const router = express.Router();
const mongo = require('../db/mongo')

/**
 * Home endpoint, returns usage desc
 */
router.get('/', (req, res) => {
    res.send('deCODE API');
})

/**
 * Returns questions and response frequency
 */
router.get('/quiz', async (req, res) => {
    // fetch question from db
    const questions = mongo.client.db('test').collection('quizQuestions');
    let question = await questions.findOne({ questionID });

    res.send(JSON.stringify(question))
})

/**
 * Receives response for question 'qID' and updates db with count
 */
router.post('/quiz/:questionID', async (req, res) => {
    const questionID = req.params.questionID;
    const selectedAnswer = req.body.response;

    // fetch question from db
    const questions = mongo.client.db('test').collection('quizQuestions');
    let question = await questions.findOne({ questionID });
    let responseFrequency = question.responseFrequency

    // increment response frequency and update db
    responseFrequency[selectedAnswer]++
    const update = {
        $set: {
            responseFrequency
        }
    };

    await questions.updateOne({ questionID }, update);

    res.send(JSON.stringify(responseFrequency))
})


module.exports = router;