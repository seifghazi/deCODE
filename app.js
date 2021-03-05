import express from 'express';
import dataRoutes from './routes/data';

const app           = express();
const port          = process.env.PORT || 8080;

// routes
app.use(dataRoutes);

app.listen(port, () => {
    console.log(`The magic happens on port: ${port}`)
})



