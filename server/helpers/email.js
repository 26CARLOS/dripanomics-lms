const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Using app-specific password
    }
});

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email - Dripanomics Tutorials',
            html: `
                <h1>Email Verification</h1>
                <p>Please click the link below to verify your email:</p>
                <a href="${process.env.CLIENT_URL}/verify-email/${verificationToken}">Verify Email</a>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Failed to send verification email');
    }
};

module.exports = { sendVerificationEmail };