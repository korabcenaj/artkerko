const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const apiResponses = await Promise.all([
            fetch(`https://api1.example.com/search?q=${query}`).then(res => res.json()),
            fetch(`https://api2.example.com/search?q=${query}`).then(res => res.json())
        ]);
        res.json(apiResponses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from APIs' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});