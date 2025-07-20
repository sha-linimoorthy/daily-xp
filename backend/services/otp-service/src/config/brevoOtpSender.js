//Delivers the mail containing OTP to the user
//TO DO Brevo only 300 mails per day, if API limit exceeded UI handling
const axios = require('axios');
const generateContent = require('./otpTemplate');
const sendOtpEmail = async (toEmail, otp) => {
    const apiKey = process.env.BREVO_API_KEY;
    const from = { name: 'DailyXP Team', email: process.env.MAIL_FROM};
    const subject = 'Your OTP Code';
    const htmlContent = generateContent(otp);

    try{
        await axios.post('https://api.brevo.com/v3/smtp/email', 
        {
        sender: from,
        to: [{email: toEmail}],
        subject,
        htmlContent
        },{
        headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
        }
    });
        console.log(`OPT email sent to ${toEmail}`);
    } catch (err) {
        console.log(`Failed to send OPT email to ${toEmail}:`, err.response?.data || err.message);
    }

};

module.exports = { sendOtpEmail };