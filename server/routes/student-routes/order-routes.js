const express = require("express");
const {
  createOrder,
  capturePaymentFinalizeOrder,
} = require("../../controllers/student-controller/order-controller");
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/finalize', capturePaymentFinalizeOrder);

module.exports = router;

