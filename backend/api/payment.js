const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const cors = require("cors");
const crypto = require("crypto");
// require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cors());

router.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_DOcyDBGTYpuOvq",
      key_secret: "vVjB8IvuLOvDT09FYHfBo7pz",
    });
    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: req.body.receipt,
    //   redirect: 'https://example.com/success',
    };
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

router.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sha = crypto.createHmac("sha256", "bn8zI3LEdRUYIcaiyZo03rtY");
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

module.exports = router;
