//TO -DO Email validation in frontend

const { generateAndSentOtp } = require('../services/generateOtpService');

const requestOtp = async (req, res) => {
    const { email } = req.body;

    if(!email)
    {
        return res.status(400).json({message: 'Email is required'});
    }

    try {
        await generateAndSentOtp(email);
        res.status(200).json({error: 'OTP sent successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to send OTP'});
    }
}

module.exports = { requestOtp };