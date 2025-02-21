const express = require('express');
const router = express.Router();
const { searchController } = require('../controllers/index');

// Define the search route
router.get('/search', searchController);

module.exports = router;