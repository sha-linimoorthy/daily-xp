//Interface for OTP generation, OTP rate limit checker and OTP sending process

const generateOtp = require('../utils/generateOtp');
const { storeOtp,
    countIpRequestsToday,
    countOtpRequestsToday,
    lastOtpForEmail,
 } = require('../db/otpModel');
const { sendOtpEmail} = require('../config/brevoOtpSender');

async function generateAndSentOtp(email, ip) {
  const emailCount = await countOtpRequestsToday(email);
  if (emailCount >= 2) {
    throw new Error('OTP request limit reached for this email. Try again tomorrow.');
  }

  const ipCount = await countIpRequestsToday(ip);
  if (ipCount >= 2) {
    throw new Error('OTP request limit reached for this IP address.');
  }

  const recentOtp = await lastOtpForEmail(email);
  if (recentOtp && !recentOtp.verified && new Date(recentOtp.expires_at) > new Date()) {
    throw new Error('A previous OTP is still valid. Please check your email.');
  }

  const otp = generateOtp();
  await storeOtp(email, otp, ip);
  await sendOtpEmail(email, otp);

  return otp;
}

module.exports = { generateAndSentOtp };