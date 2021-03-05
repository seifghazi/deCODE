const express = require('express');
const mongo = require('./db/mongo')
const questionRoutes = require('./routes/questions');
const vaccinationRoutes = require('./routes/vaccinations');
const dbSeeder = require('./utils/job')

const app = express();
const port = process.env.PORT || 8080;

const start = async () => {
    // Parse URL-encoded bodies 
    app.use(express.urlencoded());
    
    // Parse JSON bodies 
    app.use(express.json());

    // init mongodb connection
    await mongo.client.connect()

    // register routes
    app.use(questionRoutes);
    app.use(vaccinationRoutes);

    // repopulate db with vaccination data
    // dbSeeder.fetchVaccinationData()

    app.listen(port, () => {
        console.log(`The magic happens on port: ${port}`)
    })
}

start()






