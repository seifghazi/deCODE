const express = require('express');
const mongo = require('./db/mongo')
const dataRoutes = require('./routes/data');

const app = express();
const port = process.env.PORT || 8080;

const start = async () => {
    // Parse URL-encoded bodies 
    app.use(express.urlencoded());
    
    // Parse JSON bodies 
    app.use(express.json());

    // init mongodb connection
    await mongo.client.connect()

    // mongo.client.db().admin().listDatabases().then((databases) => {
    //     console.log(databases);
    //     mongo.client.close();
    // })

    // register routes
    app.use(dataRoutes);



    app.listen(port, () => {
        console.log(`The magic happens on port: ${port}`)
    })
}

start()






