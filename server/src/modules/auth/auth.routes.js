const passport = require('passport');
const express = require('express');
const { registerUser, loginUser, googleOAuthCallback} = require('./auth.controller'); 

const router = express.Router();

//Login routes
router.post('/register', registerUser);
router.post('/login', loginUser);
//Google login Routes
router.get('/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/oauth/callback', passport.authenticate('google', { session: false }), googleOAuthCallback);

module.exports = router;