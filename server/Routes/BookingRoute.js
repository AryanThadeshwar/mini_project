// const epxress = require('express');
// const router = epxress.Router();
// const { CreateBooking } = require('../Controllers/BookingController')

// router.post('/create', CreateBooking);

// module.exports = router

const express = require("express");
const router = express.Router();
const {
    CreateBooking,
    getBookingsByOwner,
    acceptBooking,
    denyBooking,
    getBookingsByCustomer
} = require("../Controllers/BookingController");

// Guest creates a booking
router.post("/create", CreateBooking);

// Owner sees all bookings for their properties
router.get("/owner/:ownerId", getBookingsByOwner);

// Owner accepts a booking
router.patch("/:id/accept", acceptBooking);

// Owner denies a booking
router.patch("/:id/deny", denyBooking);

// Guest sees their own bookings
router.get("/customer/:customerId", getBookingsByCustomer);

module.exports = router;
