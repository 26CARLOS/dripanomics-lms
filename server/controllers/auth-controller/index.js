const crypto = require('crypto');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail, sendVerificationEmail } = require('../../helpers/email');


const registerUser = async(req, res) => {
    const {userName, userEmail, password, role} = req.body;

    try {
        const existingUser = await User.findOne({userEmail});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create new user with verification defaults
        const newUser = new User({
            userName, 
            userEmail, 
            password: hashedPassword, 
            role,
            isVerified: false, // Default to unverified
            verificationToken: crypto.randomBytes(32).toString('hex'),
            verificationExpires: Date.now() + 3600000 // 1 hour expiry
        });
        
        await newUser.save();

        try {
            // Send verification email
            const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${newUser.verificationToken}`;
            await sendVerificationEmail(userEmail, verificationUrl);

            return res.status(201).json({
                success: true,
                message: 'Registration successful! Please check your email to verify your account.'
            });
        } catch (emailError) {
            // If email fails, still create account but inform user
            console.error('Email sending failed:', emailError);
            return res.status(201).json({
                success: true,
                message: 'Registration successful but verification email could not be sent. Please contact support.'
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({
            verificationToken: token,
            verificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Email verification failed'
        });
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ userEmail: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified'
            });
        }

        // Generate new verification token
        user.verificationToken = crypto.randomBytes(32).toString('hex');
        user.verificationExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send new verification email
        const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${user.verificationToken}`;
        await sendVerificationEmail(user.userEmail, verificationUrl);

        res.status(200).json({
            success: true,
            message: 'Verification email resent successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to resend verification email'
        });
    }
};

const loginUser = async(req, res) => {
    const {userEmail, password} = req.body;

    try {
        const user = await User.findOne({userEmail});

        // Check if user exists
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check email verification
        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Please verify your email before logging in'
            });
        }

        // Generate token
        const accessToken = jwt.sign({
            _id: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            role: user.role
        }, 'JWT_SECRET', {expiresIn: '120m'});

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                accessToken,
                user: {
                    _id: user._id,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.'
        });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ userEmail: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Store hashed token in database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        try {
            await sendPasswordResetEmail(email, resetUrl);
            res.status(200).json({
                success: true,
                message: 'Password reset link sent to email'
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return res.status(500).json({
                success: false,
                message: 'Error sending reset email'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Update password
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password has been reset'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {registerUser, loginUser, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail};