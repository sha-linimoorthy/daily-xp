// Count OTPs requested today for a specific email

// Count OTPs requested today from a specific IP

// Get the most recent OTP for an email

// Store OTP into the database with IP tracking and expiry

//Async function calc expiration time and inserts into the DB

//Schedules a cronjob which deletes all the expired OTP

const pool = require('../config/dbPoolConnection');
const cron = require('node-cron');

async function countOtpRequestsToday(email) {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM user_otp WHERE email = $1 AND created_at::date = CURRENT_DATE`,
            [email]
        );
        console.log(`Queried OTP count for email ${email}`);
        return parseInt(result.rows[0].count, 10);
    } catch (err) {
        console.error(`Error counting OTPs for email ${email}:`, err);
        return 0;
    }
}

async function countIpRequestsToday(ip) {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM user_otp WHERE ip_address = $1 AND created_at::date = CURRENT_DATE`,
            [ip]
        );
        console.log(`Queried OTP count for IP ${ip}`);
        return parseInt(result.rows[0].count, 10);
    } catch (err) {
        console.error(`Error counting OTPs for IP ${ip}:`, err);
        return 0;
    }
}

async function lastOtpForEmail(email) {
    try {
        const result = await pool.query(
            `SELECT * FROM user_otp WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
            [email]
        );
        return result.rows[0];
    } catch (err) {
        console.error(`Error fetching last OTP for email ${email}:`, err);
        return null;
    }
}

async function storeOtp(email, otp, ip, expiresInMins = 5){
    const expiresAt = new Date(Date.now() + expiresInMins * 60000);
    
    try {
        await pool.query(`
            INSERT INTO user_otp (email, otp, expires_at, ip_address)
            VALUES ($1, $2, $3, $4)
            `,[email, otp, expiresAt, ip]);

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
            WHERE verified = true OR expires_at < NOW() - INTERVAL '24 hours'
            `);
        console.log(`Expired OTP rows cleanup: Deleted ${result.rowCount} rows`);
    } catch (err) {
        console.error('Failed to cleanup expired OTP rows:', err);
    }
});


module.exports = { 
    countOtpRequestsToday,
    countIpRequestsToday,
    lastOtpForEmail,
    storeOtp };

