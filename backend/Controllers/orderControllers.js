const Order = require("../Models/paymentModel");
module.exports = {
  getOrder: async (req, res, next) => {
    await Order.find({ customerID: req.user._id }).exec((error, orders) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "something Error",
        });
      }
      if (!orders) {
        return res.status(401).json({
          success: false,
          message: "not available order for you",
        });
      }
      return res.status(200).json({
        success: true,
        message: orders,
      });
    });
  },
};
