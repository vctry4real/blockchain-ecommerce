const paymentRouter = require("express").Router();
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");

paymentRouter.get("/getPaymentId/:orderId", async (req, res) => {
  const savedPayment = await Payment.findOne({ orderId: req.params.orderId });

  if (savedPayment) {
    return res.json({ paymentId: savedPayment._id });
  }
  const payment = new Payment({
    orderId: req.params.orderId,
    paid: false,
  });

  await payment.save();
  res.json({ paymentId: payment._id });
});

module.exports = paymentRouter;
