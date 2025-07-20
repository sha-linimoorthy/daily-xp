const generateOtp = require('../src/utils/generateOtp');

describe('OTP Generator', () => {
    it('Should return 6-digit OTP', () =>{
        const otp = generateOtp();
        expect(otp).toHaveLength(6);
        expect(Number.isNaN(Number(otp))).toBe(false);
    });
});