const crypto = require('crypto');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('../../helpers/email');


const registerUser = async(req, res) => {
    const {userName, userEmail, password, role} = req.body;

    const existingUser = await User.findOne({userEmail});

    if(existingUser){
        return res.status(400).json({
            success: false,
            message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser  = new User({userName, userEmail, password: hashedPassword, role});
    await newUser.save();

    return res.status(201).json({
        success : true,
        message: 'User registered successfully!'
    })

};

const loginUser = async(req, res) => {
    const {userEmail, password} = req.body;

    const checkUser = await User.findOne({userEmail});

    if(!checkUser || !(await bcrypt.compare(password, checkUser.password))){
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
        });
    }

    const accessToken = jwt.sign({
        _id: checkUser._id,
        userName : checkUser.userName,
        userEmail : checkUser.userEmail,
        role: checkUser.role
    }
    , 'JWT_SECRET', {expiresIn: '120m'});

    return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data  :{
            accessToken,
            user: {
                _id: checkUser._id,
                userName: checkUser.userName,
                userEmail: checkUser.userEmail,
                role: checkUser.role
            }
        }
    });
}


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

module.exports = {registerUser, loginUser, forgotPassword, resetPassword};