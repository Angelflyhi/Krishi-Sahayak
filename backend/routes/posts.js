const express = require('express');
const auth = require('../middleware/auth');
const { createPost, getPosts } = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);

module.exports = router;
