const User = require('../Models/userModels');
const { validRegister, validLogin } = require('../Middleware/validUser');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

module.exports = {
    signUP: async (req, res) => {
        const { firstName, lastName, username, email, password } = req.body;
        const { error } = validRegister({
            firstName,
            lastName,
            username,
            email,
            password,
        });
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message,
            });
        }

        // hashed password before save it on database
        // don't let password in database with text plan
        // ( already hacker can get it and decoded it :) )
        await User.findOne({ email }, async (error, user) => {
            if ((error, user)) {
                return res.status(401).json({
                    success: false,
                    message: 'user is already token ',
                });
            }
            await bcrypt.hash(password, 12, async (error, hashPassword) => {
                if (error) {
                    return res.status(401).json({
                        success: false,
                        message: error.message,
                    });
                }

                let createUser = new User({
                    firstName,
                    lastName,
                    username,
                    email,
                    password: hashPassword,
                });
                await createUser.save(error => {
                    if (error) {
                        return res.status(401).json({
                            success: false,
                            message: error.message,
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        message: ' register successfully',
                    });
                });
            });
        });
    },
    logIn: async (req, res) => {
        const { email, password } = req.body;
        const { error } = validLogin({ email, password });
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        // check first if  user is register already in database
        await User.findOne({ email }).exec(async (error, user) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'something is wrong',
                });
            }
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Email or Password is incorrect',
                });
            }
            // check password is matching with hash password already was stored in DB
            await bcrypt.compare(password, user.password, (error, same) => {
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: 'something is wrong',
                    });
                }
                if (!same) {
                    return res.status(404).json({
                        success: false,
                        message: 'Email or Password is incorrect',
                    });
                }
                // true ? generate token with method ( accessToken ) and send with cookie and json data
                const token = accessToken({ id: user._id, role: user.role });
                const { firstName, lastName, email, role } = user;
                const displayName = firstName + ' ' + lastName;

                res.status(200)
                    .header('authorization', token)
                    .json({
                        success: true,
                        message: { id: user._id, displayName, email, role },
                    });
            });
        });
    },
    signOut: (req, res) => {
        // clear cookie has token after sign out
        return res.status(200).json({
            success: true,
            message: 'Sign out successfully',
        });
    },
    isAuth: async (req, res, next) => {
        const token = req.cookies.auth;
        console.log(req);
        // check if user if authenticated with header token
        try {
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: {
                        msg: 'please register or login 1',
                        req: req.cookies,
                    },
                });
            }
            await Jwt.verify(
                token,
                process.env.ACCESS_JWT_SECRET,
                (error, decoded) => {
                    if (error || !decoded) {
                        return res.status(401).json({
                            success: false,
                            message: {
                                msg: 'please register or login 1',
                                req: req.cookies,
                                headers: req.headers,
                            },
                        });
                    }
                    req.user = decoded;
                    next();
                }
            );
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    },
    isAdmin: async (req, res, next) => {
        // check role use for product routes
        if (req.user.role !== 1) {
            return res.status(403).json({
                success: false,
                message: 'resource denied , admin only can access it ',
            });
        }
        // if role === 1 return next and access routes only read with admin has role equal 1
        next();
    },
};
const accessToken = payload => {
    //  generate access token to authorization
    return Jwt.sign(
        { id: payload._id, role: payload.role },
        process.env.ACCESS_JWT_SECRET,
        {
            expiresIn: '1d',
        }
    );
};

// "API": "https://a2-store-api.herokuapp.com"
