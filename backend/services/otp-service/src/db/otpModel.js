//Async function calc expiration time and inserts into the DB

//Exports mail, OPT, expiry time

//Schedules a cronjob which deletes all the expired OTP

const pool = require('../config/dbPoolConnection');
const cron = require('node-cron');

async function storeOtp(email, otp, expiresInMins = 5){
    const expiresAt = new Date(Date.now() + expiresInMins * 60000);
    
    try {
        await pool.query(`
            INSERT INTO user_otp (email, otp, expires_at)
            VALUES ($1, $2, $3)
            ON CONFLICT (email)
            DO UPDATE SET otp = $2, expires_at = $3
            `,[email, otp, expiresAt]);

    console.log(`OTP stored for ${email}, expires at ${expiresAt}`);

    } catch (err) {
        console.error(`Failed to store OTP for ${email}:`, err);
    }
}

//Cron job which deletes the expired OTP rows

cron.schedule('*/10 * * * *', async () =>{
    try {
        const result = await pool.query(`
            DELETE FROM user_otp
            WHERE expires_at < NOW()
            `);
        console.log(`Expired OTP rows cleanup: Deleted ${result.rowCount} rows`);
    } catch (err) {
        console.error('Failed to cleanup expired OTP rows:', err);
    }
});


module.exports = { storeOtp };

