require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes/index');
const mediaRoutes = require('./routes/instructor-routes/media-routes');
const InstructorCourseRoutes = require('./routes/instructor-routes/course-routes');
const StudentCourseRoutes = require('./routes/student-routes/course-routes');
const OrderRoutes = require('./routes/student-routes/order-routes');
const StudentCourses_Routes = require('./routes/student-routes/student-courses-routes');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Improved MongoDB connection options
const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
};

// Better connection handling
mongoose.connect(MONGO_URI, mongooseOptions)
    .then(() => {
        console.log('Database connected successfully');
        
        // Only start server after DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', "DELETE", "PUT", 'OPTIONS'],
    allowedHeaders: ['Content-Type', "Authorization"],
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin']
}));

console.log(process.env.CLIENT_URL)

//pre-flight requests
app.options('*', cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes////////////////////////////////////////
//auth routes
app.use('/auth', authRoutes);

//media routes
app.use('/media', mediaRoutes);

//course routes
app.use('/admin/course', InstructorCourseRoutes);
app.use('/student/course', StudentCourseRoutes);

//order routes
app.use('/student/order', OrderRoutes);

//student courses routes(purchased courses)
app.use('/student/my-courses', StudentCourses_Routes);
//////////////////////////////////////////////////

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

// Handle process errors
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});
