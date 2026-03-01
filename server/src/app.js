require('dotenv').config();
require('./config/passport');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

//Auth route
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes API
app.use('/api/v1/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "ok", message: "Sportify server running 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
});