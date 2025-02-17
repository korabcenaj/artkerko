document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            fetchDataFromAPIs(query);
        }
    });

    async function fetchDataFromAPIs(query) {
        try {
            const api1Response = await fetch(`https://api1.example.com/search?q=${query}`);
            const api2Response = await fetch(`https://api2.example.com/search?q=${query}`);
            const api1Data = await api1Response.json();
            const api2Data = await api2Response.json();

            displayResults(api1Data, api2Data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayResults(api1Data, api2Data) {
        resultsContainer.innerHTML = `
            <h2>API 1 Results</h2>
            <pre>${JSON.stringify(api1Data, null, 2)}</pre>
            <h2>API 2 Results</h2>
            <pre>${JSON.stringify(api2Data, null, 2)}</pre>
        `;
    }
});