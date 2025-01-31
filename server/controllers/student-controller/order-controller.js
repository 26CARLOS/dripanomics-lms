const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");
const { generateSignature, ITN_Signature, pfValidSignature } = require("../../helpers/payfast");
const crypto = require("crypto");
const dns = require('dns');
const axios = require('axios');


let globalAmount = 0;

// Create PayFast Order
const createPayFastOrder = async (req, res) => {
    try {
        const {
            userId,
            userName,
            userEmail,
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing,
        } = req.body;


        // Create a new order in the database
        const newCourseOrder = new Order({
            userId,
            userName,
            userEmail,
            orderStatus: "pending",
            paymentMethod: "payfast",
            paymentStatus: "pending",
            orderDate: new Date(),
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing,
        });

        await newCourseOrder.save();

        // Prepare PayFast payment data
        const paymentData = {
            merchant_id: process.env.PAYFAST_MERCHANT_ID,
            merchant_key: process.env.PAYFAST_MERCHANT_KEY,
            return_url: process.env.PAYFAST_RETURN_URL,
            cancel_url: process.env.PAYFAST_CANCEL_URL,
            notify_url: process.env.PAYFAST_NOTIFY_URL.trim(),
            name_first: userName.split(' ')[0] || 'Customer',
            name_last: userName.split(' ')[1] || 'User',
            email_address: userEmail,
            amount: Number(coursePricing).toFixed(2),
            item_name: `Course: ${courseTitle}`,
            item_description: 'Online Course', 
            custom_str1: newCourseOrder._id.toString()
        };

        globalAmount = paymentData.amount;


        console.log(paymentData)

        // Generate signature
        const signature = generateSignature(paymentData, process.env.PAYFAST_PASSPHRASE);
        paymentData.signature = signature;
        console.log(signature);
        // Create PayFast URL
        const payfastUrl = `${process.env.PAYFAST_URL}?${new URLSearchParams(paymentData).toString()}`;

        res.status(201).json({
            success: true,
            message: "PayFast payment initiated successfully!",
            data: {
                payfastUrl,
                order_id: newCourseOrder._id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error initiating PayFast payment",
        });
    }
};

const pfValidServerConfirmation = async (pfHost, pfParamString) => {
    const result = await axios.post(`https://${pfHost}/eng/query/validate`, pfParamString)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error)
        });
   return result === 'VALID';
};

const pfValidPaymentData = ( cartTotal, pfData ) => {
    return Math.abs(parseFloat(cartTotal) - parseFloat(pfData['amount_gross'])) <= 0.01;
}; 

const testingMode = true;
const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

async function ipLookup(domain){
    return new Promise((resolve, reject) => {
      dns.lookup(domain, {all: true}, (err, address, family) => {
        if(err) {
          reject(err)
        } else {
          const addressIps = address.map(function (item) {
           return item.address;
          });
          resolve(addressIps);
        }
      });
    });
  }
  
  const pfValidIP = async (req) => {
    const validHosts = [
      'www.payfast.co.za',
      'sandbox.payfast.co.za',
      'w1w.payfast.co.za',
      'w2w.payfast.co.za'
    ];
  
    let validIps = [];
    const pfIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    try{
      for(let key in validHosts) {
        const ips = await ipLookup(validHosts[key]);
        validIps = [...validIps, ...ips];
      }
    } catch(err) {
      console.error(err);
    }
  
    const uniqueIps = [...new Set(validIps)];
  
    if (uniqueIps.includes(pfIp)) {
      return true;
    }
    return false;
  };

// Handle PayFast Notification (ITN)
const handlePayFastNotification = async (req, res) => {
    try {
        // Log the raw request
        console.log('PayFast ITN Received:', {
            headers: req.headers,
            body: req.body
        });

        
        
        // Validate signature
        const pfData = JSON.parse(JSON.stringify(req.body));

        let pfParamString = "";
        for (let key in pfData) {
        if(pfData.hasOwnProperty(key) && key !== "signature"){
            pfParamString +=`${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}&`;
        }
        }
        // Remove last ampersand
        pfParamString = pfParamString.slice(0, -1);
        
        const check1 = pfValidSignature(pfData, pfParamString, process.env.PAYFAST_PASSPHRASE);
        const check2 = pfValidIP(req);
        const check3 = pfValidPaymentData( globalAmount, pfData );
        const check4 = pfValidServerConfirmation(pfHost, pfParamString);

        if (!check1 || !check2 || !check3 || !check4) {
            console.error('Invalid ITN request:', {
                check1,
                check2,
                check3,
                check4
            });
            return res.status(200).send('Invalid ITN request');
        }
        
        // Process payment after validation
        await processPayment(pfData);

        res.status(200).send('OK');
        
    } catch (error) {
        console.error('ITN Error:', error);
        res.status(200).send('OK'); // Always return 200
    }
};

// Separate payment processing
async function processPayment(pfData) {
    const orderId = pfData.custom_str1;
    const paymentStatus = pfData.payment_status;



    try {
        const order = await Order.findById(orderId);
        if (!order) {
            console.error('Order not found:', orderId);
            return;
        }

        if (paymentStatus === "COMPLETE") {
            order.paymentStatus = "paid";
            order.orderStatus = "confirmed";
            await order.save();

            const studentCourses = await StudentCourses.findOne({ userId: order.userId });
            const course = await Course.findById(order.courseId);
            if (studentCourses) {
                studentCourses.courses.push({
                    courseId: order.courseId,
                    title: order.courseTitle,
                    instructorId: order.instructorId,
                    instructorName: order.instructorName,
                    dateOfPurchase: order.orderDate,
                    courseImage: order.courseImage,
                });
                await studentCourses.save();

                
            }
            else{
                const newStudentCourses = new StudentCourses({
                    userId: order.userId,
                    courses: [{
                        courseId: order.courseId,
                        title: order.courseTitle,
                        instructorId: order.instructorId,
                        instructorName: order.instructorName,
                        dateOfPurchase: order.orderDate,
                        courseImage: order.courseImage,
                    }]
                });
                await newStudentCourses.save();
            }
            
            if(course){
                course.students.push({
                    studentId: order.userId,
                    studentName: order.userName,
                    dateOfPurchase: order.orderDate,
                })
                await course.save();
            }else{
                console.error('Course not found:', order.courseId);
            }

        }
    } catch (error) {
        console.error('Payment processing error:', error);
    }
}

module.exports = {
    createPayFastOrder,
    handlePayFastNotification,
};