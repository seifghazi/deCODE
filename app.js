const express = require('express');
const MongoClient = require('mongodb').MongoClient
const dataRoutes = require('./routes/data');

const app = express();
const port = process.env.PORT || 8080;

// connect to db
// TODO: remove password to env
const uri = "mongodb+srv://decode:<PASSWORD>@cluster0.xmdbc.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) {
        console.log(err)
    }
    client.db().admin().listDatabases().then((databases) => {
        console.log(databases);
        client.close();
    })
});

// routes
app.use(dataRoutes);

app.listen(port, () => {
    console.log(`The magic happens on port: ${port}`)
})



