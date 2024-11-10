const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

// authorize(['admin']) ตรวจสอบสิทธิ์ 
router.get('/', authenticate, authorize(['admin']), getUsers);

module.exports = router;
