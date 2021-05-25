const Router = require('express').Router();
const { isAuth } = require('../Controllers/authControllers');
const { getOrder } = require('../Controllers/orderControllers');
Router.route('/get/order/:id').get(isAuth, getOrder);

module.exports = Router;
