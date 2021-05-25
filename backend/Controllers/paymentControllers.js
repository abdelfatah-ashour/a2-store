const PaymentGetaway = require("../Models/paymentModel");
module.exports = {
  paymentPaypal: async (req, res, next) => {
    const { customerID, items, paymentID } = req.body;
    const newOrder = new PaymentGetaway({
      customerID: customerID.id,
      paymentID,
      items,
    });
    await newOrder.save((error, order) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: "order is successful",
      });
    });
  },
};
