const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { handleSearch } = require('./controllers/index');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', handleSearch);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});