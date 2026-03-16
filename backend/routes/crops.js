const express = require('express');
const { getCrops, getCropById, createCrop } = require('../controllers/cropController');

const router = express.Router();

router.get('/', getCrops);
router.get('/:id', getCropById);
router.post('/', createCrop);

module.exports = router;
