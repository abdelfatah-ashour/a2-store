const Router = require('express').Router();

const { signUP, logIn, signOut } = require('../Controllers/authControllers');

Router.route('/signup').post(signUP);
Router.route('/login').post(logIn);
Router.route('/signout').post(signOut);

module.exports = Router;
