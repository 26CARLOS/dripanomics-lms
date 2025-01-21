


const Order = require('../../models/Order');

const createOrder = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
        
    }
}

const capturePaymentFinalizeOrder = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
        
    }
}

module.exports = { createOrder, capturePayment };