const User = require('../../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const users = await User.find({
            $or: [
                { userName: { $regex: query, $options: 'i' }},
                { userEmail: { $regex: query, $options: 'i' }}
            ]
        }, '-password');
        
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const promoteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Attempting to promote user with ID:', userId);

        if (!userId) {
            console.error('No userId provided');
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const user = await User.findById(userId);
        
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role === 'admin') {
            console.log('User is already an admin:', userId);
            return res.status(400).json({
                success: false,
                message: 'User is already an admin'
            });
        }

        user.role = 'admin';
        await user.save();
        console.log('User promoted successfully:', userId);

        res.status(200).json({
            success: true,
            message: 'User promoted to admin successfully'
        });
    } catch (error) {
        console.error('Error promoting user:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to promote user'
        });
    }
};

const demoteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role === 'user') {
            return res.status(400).json({
                success: false,
                message: 'User is already a regular user'
            });
        }

        user.role = 'user';
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User demoted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to demote user'
        });
    }
};

module.exports = {
    getAllUsers,
    searchUsers,
    deleteUser,
    promoteUser,
    demoteUser
};

