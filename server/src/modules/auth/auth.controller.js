const authService = require('./auth.service');

const registerUser = async (req, res) => {
    try {
    const result = await authService.register(req.body);
    
    // Cookie HttpOnly for the refresh token
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        status: "success",
        data: {
        user: result.user,
        accessToken: result.accessToken
        }
    });
    } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
    const result = await authService.login(req.body);
    
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        status: "success",
        data: {
        user: result.user,
        accessToken: result.accessToken
        }
    });
    } catch (error) {
    res.status(401).json({ status: "error", message: error.message });
    }
};

module.exports = { registerUser, loginUser };