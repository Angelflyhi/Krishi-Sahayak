const express = require('express');
const { getMandiRates } = require('../controllers/mandiController');

const router = express.Router();

router.get('/', getMandiRates);

module.exports = router;
