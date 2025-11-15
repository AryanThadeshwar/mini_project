const PageListingSchema = require("../modals/PageListingSchema");
const UserSchema = require('../modals/UserSchema');

/** ===============================
 * CREATE LISTING
 * =============================== */
const createListing = async (req, res) => {
    try {
        const {
            creator,
            type,
            streetAddress,
            aptSuite,
            city,
            country,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            price,
        } = req.body;

        const listingPhotos = req.files;

        if (!listingPhotos || listingPhotos.length === 0) {
            return res.status(400).json({ success: false, msg: "No file uploaded." });
        }

        // Store uploaded photo paths
        const listingPhotoPaths = listingPhotos.map((file) =>
            file.path.replace(/\\/g, "/") // Fix Windows paths
        );

        const newListing = new PageListingSchema({
            creator,
            type,
            streetAddress,
            aptSuite,
            city,
            country,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths: listingPhotoPaths, // ✅ correct field
            title,
            description,
            price,
        });

        await newListing.save();

        // Link listing to user
        await UserSchema.findByIdAndUpdate(
            creator,
            { $push: { listings: newListing._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            msg: "Listing successfully created!",
            listing: newListing,
        });
    } catch (error) {
        console.error("❌ Create Listing Error:", error);
        return res.status(500).json({
            success: false,
            msg: "Listing not created!",
            error: error.message,
        });
    }
};

/** ===============================
 * GET ALL LISTINGS
 * =============================== */
const getAllListingProperty = async (req, res) => {
    const qCategory = req.query.category;
    console.log(qCategory)
    try {
        let listings;

        if (qCategory) {
            listings = await PageListingSchema.find({ category: qCategory })
                .populate("creator");
        } else {
            listings = await PageListingSchema.find({})
                .populate("creator");
        }

        return res.status(200).json({ success: true, listings });
    } catch (error) {
        console.error("❌ Fetch Listings Error:", error);
        return res.status(500).json({
            success: false,
            msg: "Error fetching listings.",
            error: error.message,
        });
    }
};




/** ===============================
 * GET SINGLE PROPERTY
 * =============================== */
const getSingleProperty = async (req, res) => {
    const { listingId } = req.params;
    try {
        const listingOK = await PageListingSchema.findById(listingId)
            .populate("creator");

        if (!listingOK) {
            return res.status(404).json({ success: false, msg: "Listing not found." });
        }

        return res.status(200).json({ success: true, listingOK });
    } catch (error) {
        console.error("❌ Fetch Single Listing Error:", error);
        return res.status(500).json({
            success: false,
            msg: "Unable to fetch data.",
            error: error.message,
        });
    }
};

/** ===============================
 * SEARCH PROPERTY
 * =============================== */
const searchProperty = async (req, res) => {
    const { search } = req.params;
    try {
        let listings = [];

        if (search === "all") {
            listings = await PageListingSchema.find().populate("creator");
        } else {
            listings = await PageListingSchema.find({
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                ],
            }).populate("creator");
        }

        return res.status(200).json({ success: true, listings });
    } catch (error) {
        console.error("❌ Search Error:", error);
        return res.status(500).json({
            success: false,
            msg: "Error searching properties.",
            error: error.message,
        });
    }
};

// delete lisitng
const deleteListing = async (req, res) => {
    try {
        await PageListingSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Listing deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete" });
    }
};


module.exports = {
    createListing,
    getAllListingProperty,
    getSingleProperty,
    searchProperty,
    deleteListing
};

