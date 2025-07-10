const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/esewa/verify", paymentController.esewaPay);
router.post("/khalti/verify",paymentController.khaltiPay);

router.post("success",paymentController.paymentSuccess);
module.exports = router;





