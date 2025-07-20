//Routes to the respective controllers

const express = require('express');
const router = express.Router();
const { requestOtp } = require('../controllers/requestOtpController');
const { verifyOtpController } = require('../controllers/verifyOtpController');

router.post('/otp', requestOtp);
router.post('/verify-otp', verifyOtpController);

module.exports = router;