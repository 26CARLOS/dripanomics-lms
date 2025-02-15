const nodemailer = require('nodemailer');

// Test the email configuration on startup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Verify email configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log("Email server is ready");
    }
});

const sendVerificationEmail = async (email, verificationUrl) => {
    console.log(verificationUrl)
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email - Dripanomics Tutorials',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Verify Your Email</h2>
                    <p>Thank you for registering! Please click the link below to verify your email:</p>
                    <a href="${verificationUrl}" 
                       style="display: inline-block; padding: 10px 20px; margin: 20px 0; 
                              background-color: #007bff; color: white; text-decoration: none; 
                              border-radius: 5px;">
                        Verify Email
                    </a>
                    <p>This link will expire in 1 hour.</p>
                    <p>Best regards,<br>Dripanomics Team</p>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', result);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Failed to send verification email');
    }
};

async function sendPasswordResetEmail(email, resetUrl) {
    try {


        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Your Password - Dripanomics Grail',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Reset Your Password</h2>
                    <p>You requested to reset your password. Click the link below to set a new password:</p>
                    <a href="${resetUrl}" 
                       style="display: inline-block; padding: 10px 20px; margin: 20px 0; 
                              background-color: #007bff; color: white; text-decoration: none; 
                              border-radius: 5px;">
                        Reset Password
                    </a>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>Best regards,<br>Dripanomics Grail Team</p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending reset password email:', error);
        throw new Error('Failed to send reset password email');
    }
}

module.exports = {
    sendPasswordResetEmail,
    sendVerificationEmail
};
