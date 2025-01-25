const paypal = require('../../helpers/paypal');
const Order = require('../../models/Order');
const StudentCourses = require('../../models/studentCourses');
const Course = require('../../models/Course');


const createOrder = async (req, res) => {
    try {
        const {
    userId,
    userName,
    userEmail,
    orderStatus,
    paymentMethod,
    paymentStatus,
    orderDate,
    paymentId,
    payerId ,
    instructorId ,
    instructorName ,
    courseImage,
    courseTitle,
    courseId,
    coursePricing
        } = req.body;

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls:{
                return_url: `${process.env.CLIENT_URL}/payment-return`,
                cancel_url: `${process.env.CLIENT_URL}/payment-cancel`
            },
            transactions:[
                {
                    item_list: {
                        items: [
                            {
                                name: courseTitle,
                                sku: courseId,
                                price: Number(coursePricing).toFixed(2),
                                currency: 'USD',
                                quantity: 1
                            }
                        ]
                    },
                    amount: {
                        currency: 'USD',
                        total: coursePricing.toFixed(2),
                    },
                    description: courseTitle
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, payment) => {
            if(error){
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Error creating payment!"
                })
            }else{
                const newCourseOrder = new Order({
                    userId,
                    userName,
                    userEmail,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    orderDate,
                    paymentId,
                    payerId ,
                    instructorId ,
                    instructorName ,
                    courseImage,
                    courseTitle,
                    courseId,
                    coursePricing});

                    await newCourseOrder.save();
                    const approveUrl = payment.links.find(link => link.rel === 'approval_url').href;
        
                    res.status(201).json({
                        success: true,
                        message: "Payment created successfully!",
                        data: {
                            approveUrl,
                            order_id: newCourseOrder._id
                        }
                    })
            }
           
        })

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
        const { order_id, paymentId, payerId } = req.body;

        let order = await Order.findById(order_id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!"
            });
        }
        
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;

        await order.save();

        // Fix: Changed StudentCourses to studentCourses
        let studentCourses = await StudentCourses.findOne({
            userId: order.userId
        });

        if (studentCourses) { // Fix: Changed StudentCourses to studentCourses
            studentCourses.courses.push({
                courseId: order.courseId,
                title: order.courseTitle,
                instructorId: order.instructorId,
                instructorName: order.instructorName,
                dateOfPurchase: new Date(),
                courseImage: order.courseImage
            });

            await studentCourses.save();
        } else {
            const newStudentCourses = new StudentCourses({
                userId: order.userId,
                courses: [{
                    courseId: order.courseId,
                    title: order.courseTitle,
                    instructorId: order.instructorId,
                    instructorName: order.instructorName,
                    dateOfPurchase: new Date(),
                    courseImage: order.courseImage
                }]
            });
            studentCourses = await newStudentCourses.save();
        }

        await Course.findByIdAndUpdate(order.courseId, {
            $addToSet: {
                students: {
                    studentId: order.userId,
                    studentName: order.userName,
                    studentEmail: order.userEmail,
                    amountPaid: order.coursePricing
                }
            }
        });

        res.status(200).json({
            success: true,
            message: "Order confirmed",
            data: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error finalizing payment"
        });
    }
};

module.exports = { createOrder, capturePaymentFinalizeOrder };