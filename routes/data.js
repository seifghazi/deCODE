const { response } = require('express');
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
router.get('/questions', async (req, res) => {
    // fetch question from db
    const questions = mongo.client.db('test').collection('quizQuestions');
    let result = await questions.find().toArray();

    // calculate responseCount along with percentage for each question and its choices
    let formattedQuesResponse = {};
    result.forEach((question) => {
        let totalResponseCount = question.responseFrequency.reduce((a, b) => a + b, 0);

        let responses = {};
        question.responseFrequency.forEach((responseFreq, idx) => {
            responses[idx] = {
                numTimesAnswered: responseFreq,
                percentage: Math.round((responseFreq / totalResponseCount) * 100, 1)
            }
        })

        formattedQuesResponse[`q${question.questionID}`] = responses;
    })

    res.send(JSON.stringify(formattedQuesResponse))
})

/**
 * Return stats for specific question
 */
router.get('/questions/:questionID', async (req, res) => {
    const questionID = req.params.questionID

    // fetch question from db
    const questions = mongo.client.db('test').collection('quizQuestions');
    let question = await questions.findOne({ questionID });
    let responseFrequency = question.responseFrequency

    // calculate responseCount along with percentage for each choice
    let formattedQuesResponse = {};
    let totalResponseCount = responseFrequency.reduce((a, b) => a + b, 0);

    let responses = {};
    question.responseFrequency.forEach((responseFreq, idx) => {
        responses[idx] = {
            numTimesAnswered: responseFreq,
            percentage: Math.round((responseFreq / totalResponseCount) * 100, 1)
        }
    })

    formattedQuesResponse[`q${question.questionID}`] = responses;

    res.send(formattedQuesResponse)
})

/**
 * Receives response for question 'qID' and updates db with count
 */
router.post('/questions/:questionID', async (req, res) => {
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