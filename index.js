const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

// Function to fetch data from APIs
const fetchDataFromAPIs = async (query) => {
    const apiUrls = [
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`,
        `https://api2.example.com/search?q=${query}`,
        // Add more API URLs here
    ];

    try {
        const apiResponses = await Promise.all(apiUrls.map(url => fetch(url).then(res => res.json())));
        return apiResponses;
    } catch (error) {
        console.error('Error fetching data from APIs:', error);
        throw new Error('Failed to fetch data from APIs');
    }
};

app.get('/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {   
        const apiResponses = await fetchDataFromAPIs(query);
        res.json(apiResponses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});