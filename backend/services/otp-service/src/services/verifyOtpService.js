//Fetch OTP and expired time from db

//Check if OTP expired else verify otp
const pool = require('../config/dbPoolConnection');
const { isExpired } = require('../utils/timeUtils');
const verifyOtp = async(email, inputOtp) => {
    try {
        const result = await pool.query(
        `SELECT otp, expires_at FROM user_otp WHERE email = $1 ORDER BY expires_at DESC LIMIT 1`,
        [email]
    );

        if(result.rowCount === 0)
        {
            return { status:404, message: 'OTP not found for this email'};
        }

        const { otp: storedOtp, expires_at } = result.rows[0];

        if(isExpired(expires_at))
        {
            return { status:410, message: 'OTP has been Expired'};
        }

        if(storedOtp !== inputOtp)
        {
            return { status: 401, message: 'Invalid OTP'};
        }

        await pool.query(
            `UPDATE user_otp SET verified = TRUE WHERE email = $1 AND otp = $2`, [email, inputOtp]
        );

        return { status: 200, message: 'OTP Verified Successfully'};

    } catch (err) {
        console.error('Error verifying OTP:', err);
        return { status: 500, message: "Error Verifying OTP"}
    }

}

module.exports = { verifyOtp };
