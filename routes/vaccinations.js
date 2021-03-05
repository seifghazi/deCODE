const { response } = require('express');
const express = require('express');
const router = express.Router();
const mongo = require('../db/mongo')

/**
 * Vaccinations endpoint, returns vaccination stats
 */
router.get('/vaccinations', async (req, res) => {
    const vaccinationCollection = mongo.client.db("test").collection("vaccinations");
    let vaccines = await vaccinationCollection.find().toArray()

    res.send((JSON.stringify(vaccines[0].x)))
})

module.exports = router;