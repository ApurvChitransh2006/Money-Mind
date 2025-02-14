// Creating Enviornment Variable
require('dotenv').config();

// Creating an App through Express 
const express = require('express');
const app = express();

// Connecting Database to this App
const connectToDb = require('./config/db')
connectToDb()

// Importing Routes & APIs
const userRoutes = require('./routes/user.routes')
const subsRoutes = require('./routes/subscriber.routes')
const msgsRoutes = require('./routes/contact.routes')
const authRoutes = require('./routes/auth.routes')
const budgetRoutes = require('./routes/budget.routes')
const transRoutes = require('./routes/transaction.routes')
const specialRoutes = require('./routes/speacil.routes')

// Importing Libraries
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')

// Middleware
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser())
app.use(cors({
    origin: "https://money-mind-gamma.vercel.app", // Allow only this frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], //
    credentials: true //
    }));

// Connecting Routes
app.use('/api/user', userRoutes)
app.use('/api/subs', subsRoutes)
app.use('/api/msg', msgsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/budget', budgetRoutes)
app.use('/api/trans', transRoutes)
app.use('/api/special', specialRoutes)

app.get('/', (req, res) => {
    res.json(JSON.stringify("Hello Dear User You Found Our Backend"))
})

// Server Creation
module.exports = app;
