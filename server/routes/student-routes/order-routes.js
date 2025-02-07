const express = require("express");
const {
  createPayFastOrder,
  handlePayFastNotification,
  createPayFastCartOrder
} = require("../../controllers/student-controller/order-controller");
const router = express.Router();

router.post('/create-cart', createPayFastCartOrder);
router.post('/notify', handlePayFastNotification);

module.exports = router;

