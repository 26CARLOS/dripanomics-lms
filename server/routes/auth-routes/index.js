const express = require('express');
const {registerUser, loginUser, forgotPassword, resetPassword } = require('../../controllers/auth-controller/index');
const authenticateMiddleware = require('../../middleware/auth-middleware');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-auth', authenticateMiddleware, (req, res) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        message: 'User is authenticated',
        data: {
            user,
        }
    });
})
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;