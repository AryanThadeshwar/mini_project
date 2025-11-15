// // const BookingSchema = require('../modals/BookingSchema');


// // const CreateBooking = async (req, res) => {
// //     try {
// //         const {
// //             customerId,
// //             hostId,
// //             listingId,
// //             startDate,
// //             endDate,
// //             totalPrice,
// //         } = req.body;
// //         const newBooking = new BookingSchema({
// //             customerId,
// //             hostId,
// //             listingId,
// //             startDate,
// //             endDate,
// //             totalPrice,
// //         });
// //         await newBooking.save();
// //         res.status(201).json({ success: true, newBooking });
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(400).json({ success: false, error: error.message, msg: "Failed to create new booking" });
// //     }
// // }

// // module.exports={
// //     CreateBooking,
// // }

// const BookingSchema = require('../modals/BookingSchema');

// // Create a new booking
// const CreateBooking = async (req, res) => {
//     try {
//         const {
//             customerId,
//             hostId,
//             listingId,
//             startDate,
//             endDate,
//             totalPrice,
//         } = req.body;

//         const newBooking = new BookingSchema({
//             customerId,
//             hostId,
//             listingId,
//             startDate,
//             endDate,
//             totalPrice,
//         });

//         await newBooking.save();
//         res.status(201).json({ success: true, newBooking });
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).json({ success: false, error: error.message, msg: "Failed to create new booking" });
//     }
// };

// // Get bookings for properties owned by a specific landlord
// const getBookingsByOwner = async (req, res) => {
//     try {
//         const ownerId = req.params.ownerId;
//         const bookings = await BookingSchema.find({ hostId: ownerId })
//             .populate("listingId")
//             .populate("customerId");

//         res.status(200).json({ bookings });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch bookings", error });
//     }
// };

// // Accept a booking
// const acceptBooking = async (req, res) => {
//     try {
//         const bookingId = req.params.id;
//         const booking = await BookingSchema.findByIdAndUpdate(
//             bookingId,
//             { status: "accepted" },
//             { new: true }
//         )
//             .populate("listingId")
//             .populate("customerId");

//         res.status(200).json({ message: "Booking accepted", booking });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to accept booking", error });
//     }
// };

// // Deny a booking
// const denyBooking = async (req, res) => {
//     try {
//         const bookingId = req.params.id;
//         const booking = await BookingSchema.findByIdAndUpdate(
//             bookingId,
//             { status: "denied" },
//             { new: true }
//         )
//             .populate("listingId")
//             .populate("customerId");

//         res.status(200).json({ message: "Booking denied", booking });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to deny booking", error });
//     }
// };

// module.exports = {
//     CreateBooking,
//     getBookingsByOwner,
//     acceptBooking,
//     denyBooking
// };

const BookingSchema = require("../modals/BookingSchema");

// Guest creates a booking
const CreateBooking = async (req, res) => {
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

        const newBooking = new BookingSchema({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice,
        });

        await newBooking.save();
        res.status(201).json({ success: true, newBooking });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, msg: "Failed to create booking", error: error.message });
    }
};

// Get all bookings for properties owned by a specific owner
const getBookingsByOwner = async (req, res) => {
    try {
        const ownerId = req.params.ownerId;
        const bookings = await BookingSchema.find({ hostId: ownerId })
            .populate("listingId")
            .populate("customerId");

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings", error });
    }
};

// Accept a booking (owner)
const acceptBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await BookingSchema.findByIdAndUpdate(
            bookingId,
            { status: "accepted" },
            { new: true }
        )
            .populate("listingId")
            .populate("customerId");

        res.status(200).json({ message: "Booking accepted", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to accept booking", error });
    }
};

// Deny a booking (owner)
const denyBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await BookingSchema.findByIdAndUpdate(
            bookingId,
            { status: "denied" },
            { new: true }
        )
            .populate("listingId")
            .populate("customerId");

        res.status(200).json({ message: "Booking denied", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to deny booking", error });
    }
};

// Optional: get bookings for guest
const getBookingsByCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const bookings = await BookingSchema.find({ customerId })
            .populate("listingId")
            .populate("hostId");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch customer bookings", error });
    }
};

module.exports = {
    CreateBooking,
    getBookingsByOwner,
    acceptBooking,
    denyBooking,
    getBookingsByCustomer
};
