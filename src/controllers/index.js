// Function to fetch data from APIs
const fetchDataFromAPIs = async (query) => {
    const apiUrls = [
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`,
        `https://api.artic.edu/api/v1/artworks/search?q=${query}`,
        // Add more API URLs here
    ];

    try {
        const apiResponses = await Promise.all(apiUrls.map(url => fetch(url).then(res => res.json())));

        // Fetch details for each object ID from the Met Museum API
        const metObjectIDs = apiResponses[0].objectIDs || [];
        const metObjectDetails = await Promise.all(metObjectIDs.slice(0, 10).map(id => 
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
        ));

        // Combine the responses
        return [...metObjectDetails, ...apiResponses.slice(1)];
    } catch (error) {
        console.error('Error fetching data from APIs:', error);
        throw new Error('Failed to fetch data from APIs');
    }
};

const handleSearch = async (req, res) => {
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
};

module.exports = {
    handleSearch,
};