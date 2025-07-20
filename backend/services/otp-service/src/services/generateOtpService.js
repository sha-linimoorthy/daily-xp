//Interface for OTP generation and OTP sending process

const generateOtp = require('../utils/generateOtp');
const { storeOtp } = require('../db/otpModel');
const { sendOtpEmail} = require('../config/brevoOtpSender');

async function generateAndSentOtp (email) {
    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendOtpEmail(email,otp);
    return otp;
}

module.exports = { generateAndSentOtp };