const papa = require("papaparse");
const request = require("request");
const mongo = require('../db/mongo')

const fetchVaccinationData = async () => {
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT);
    const dataStream = request
        .get("https://health-infobase.canada.ca/src/data/covidLive/vaccination-administration.csv")
        .pipe(parseStream);

    let data = [];
    parseStream.on("data", chunk => {
        data.push(chunk);
    });

    let x = {}
    dataStream.on("finish", async () => {
        for (let i = 1; i < data.length; i++) {
            if (x[data[i][1].toString()] == undefined) x[data[i][1].toString()] = 0;
            else x[data[i][1].toString()] = parseInt(data[i][3])
        }

        let vaccinations = mongo.client.db("test").collection("vaccinations")
        const options = { upsert: true };
        await vaccinations.updateOne({}, { $set: { x } }, options)

    });

}

module.exports = { fetchVaccinationData }
