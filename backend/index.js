const express = require('express');
const restAPI= require('./src/restAPI');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use('/api', restAPI);

const startServer = async () => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
};

startServer();