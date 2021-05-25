const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { connectDB } = require('./config/connectDB');
const cors = require('cors');
const path = require('path');

// route of variable environment
require('dotenv').config({
    path: './config/.env',
});

// connectDB
connectDB(process.env.DB_URL);

// cors policy
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        path: '/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        exposedHeaders: ['authorization', 'cookie', 'Set-Cookie'],
    })
);

// middleware express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public', 'uploads')));

// node environment  mode is development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('div'));
}

app.use(helmet());

// ROUTES
app.use('/api', require('./Routes/authRoutes'));
app.use('/api', require('./Routes/productRoutes'));
app.use('/api', require('./Routes/paymentRoutes'));
app.use('/api', require('./Routes/orderRoutes'));

const PORT = process.env.PORT || 9000;

// listen backend server on port 3000
app.listen(PORT);
