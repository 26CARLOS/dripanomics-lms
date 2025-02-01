const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../../controllers/student-controller/cart-controller');

const router = express.Router();

router.post('/add', addToCart);
router.get('/get/:userId', getCart);
router.delete('/remove/:userId/:courseId', removeFromCart);

module.exports = router;