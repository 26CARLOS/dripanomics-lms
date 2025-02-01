const Cart = require('../../models/Cart');
const Course = require('../../models/Course');

const addToCart = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        
        // Get course details
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Find or create cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], total: 0 });
        }

        // Check if course already in cart
        const courseExists = cart.items.find(item => item.courseId === courseId);
        if (courseExists) {
            return res.status(400).json({
                success: false,
                message: 'Course already in cart'
            });
        }

        // Add course to cart
        cart.items.push({
            courseId: course._id,
            title: course.title,
            price: course.pricing,
            instructorId: course.instructorId,
            instructorName: course.InstructorName,
            courseImage: course.image
        });

        // Update total
        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Course added to cart',
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        
        res.status(200).json({
            success: true,
            data: cart || { items: [], total: 0 }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = cart.items.filter(item => item.courseId !== courseId);
        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Course removed from cart',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};