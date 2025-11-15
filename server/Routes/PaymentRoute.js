const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../Controllers/PaymentsController");

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
