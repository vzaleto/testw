const express = require('express');
const bodyParser = require('body-parser');
const { calculateCommission } = require('./conculate');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.post('/calculate', (req, res) => {
    try {
        const operations = req.body.operations;
        if (!Array.isArray(operations)) {
            throw new Error('Operations data is not an array.');
        }

        const result = calculateCommission(operations);
         console.log(operations)
        res.json(result);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
