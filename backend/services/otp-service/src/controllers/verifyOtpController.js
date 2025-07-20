// Contoller for OTP verification

const { verifyOtp } = require('../services/verifyOtpService');

const verifyOtpController = async (req, res) => {
    const { email, otp } = req.body;
    
    if(!email || !otp)
    {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try{
        const result = await verifyOtp(email, otp);
        return res.status(result.status).json({ message: result.message});
    } catch (err) {
        console.error('OTP Verification error:', err);
        return res.status(500).json({ message: 'Server error verifying OTP'});
    }
}

module.exports = { verifyOtpController };