//Checks if the current time is far from OTP expired time

const isExpired = (expiresAt) => {
    const now = new Date();
    return now > new Date(expiresAt);
};

module.exports = { isExpired };