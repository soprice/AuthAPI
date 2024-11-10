const rateLimit = require('express-rate-limit');

// กัน spam
const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 20,
    message: 'Too many requests from this IP, please try again later.',
    skipSuccessfulRequests: true,
});

module.exports = rateLimiter;
