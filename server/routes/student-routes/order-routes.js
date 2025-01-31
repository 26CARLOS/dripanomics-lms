const express = require("express");
const {
  createPayFastOrder,
  handlePayFastNotification,
} = require("../../controllers/student-controller/order-controller");
const router = express.Router();

router.post('/create', createPayFastOrder);
router.post('/notify', handlePayFastNotification);

module.exports = router;

