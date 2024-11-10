const express = require('express');
const { getProducts } = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.get('/', authenticate, rateLimiter, getProducts);

module.exports = router;
