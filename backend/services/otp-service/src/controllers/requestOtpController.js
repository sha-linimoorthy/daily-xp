//TO -DO Email validation in frontend

const { generateAndSentOtp } = require('../services/generateOtpService');

function getIp(req) {
    const forwarded = req.headers['x-forwarder-for'];
    return forwarded ? forwarded.split(',')[0].trim() : req.connection.remoteAddress;
}


const requestOtp = async (req, res) => {
    const { email } = req.body;
    const ip = getIp(req);

    if(!email)
    {
        return res.status(400).json({message: 'Email is required'});
    }

    try {
        await generateAndSentOtp(email, ip);
        res.status(200).json({message: 'OTP sent successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message});
    }
}

module.exports = { requestOtp };