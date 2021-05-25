const Router = require('express').Router();
const { isAuth } = require('../Controllers/authControllers');
const { paymentPaypal } = require('../Controllers/paymentControllers');
Router.route('/payment/success').post(isAuth, paymentPaypal);

module.exports = Router;
