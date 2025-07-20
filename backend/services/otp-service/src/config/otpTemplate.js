//HTML Content to be displayed in the email

module.exports = function generateContent(otp) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #333;">Your DailyXP OTP Code</h2>
      
      <p style="font-size: 16px; color: #555;">
        Hello,
      </p>
      
      <p style="font-size: 16px; color: #555;">
        Your One-Time Password (OTP) for secure access to <strong>DailyXP</strong> is:
      </p>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 28px; font-weight: bold; color: #2a9d8f;">${otp}</span>
      </div>
      
      <p style="font-size: 16px; color: #555;">
        This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.
      </p>
      
      <p style="font-size: 16px; color: #555;">
        If you did not request this OTP, please ignore this email or contact our support team.
      </p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;">
      
      <p style="font-size: 13px; color: #999; text-align: center;">
        &copy; ${new Date().getFullYear()} DailyXP. All rights reserved.<br>
        Need help? Reach us at <a href="mailto:admin@dailyxp.xyz" style="color: #2a9d8f;">admin@dailyxp.xyz</a>
      </p>
    </div>
  `;
};
