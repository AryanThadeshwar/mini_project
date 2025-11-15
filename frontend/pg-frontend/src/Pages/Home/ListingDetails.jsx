// import React, { useEffect, useState } from "react";
// import "../../Styles/ListingDetails.scss";
// import { useNavigate, useParams } from "react-router-dom";
// import { facilities } from "../../catDB";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import Loader from "../../Components/Loader";
// import Navbar from "../../Components/Navbar";
// import { useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast"
// // import Footer from "../components/Footer"

// const ListingDetails = () => {
//     const [loading, setLoading] = useState(true);

//     const { listingId } = useParams();
//     const [listing, setListing] = useState(null);

//     const getListingDetails = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/v1/properties/${listingId}`,
//                 {
//                     method: "GET",
//                 }
//             );
//             if (!response.ok) {
//                 toast.error("Failed to fetch listing details")
//             }
//             const data = await response.json();
//             console.log(data)
//             setListing(data.listingOK);
//             // setLoading(false);
//         } catch (err) {
//             console.log("Fetch Listing Details Failed", err.message);
//             toast.error("Failed to fetch listing details")
//         }
//         finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getListingDetails();
//     }, []);

//     console.log(listing)


//     /* BOOKING CALENDAR */
//     const [dateRange, setDateRange] = useState([
//         {
//             startDate: new Date(),
//             endDate: new Date(),
//             key: "selection",
//         },
//     ]);

//     const handleSelect = (ranges) => {
//         // Update the selected date range when user makes a selection
//         setDateRange([ranges.selection]);
//     };

//     const start = new Date(dateRange[0].startDate);
//     const end = new Date(dateRange[0].endDate);
//     const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

//     /*** BOOKING SUBMIT HANDLE ***/
//     const customerId = useSelector((state) => state?.user?._id);
//     const isCreator = listing?.creator?._id === customerId;

//     const navigate = useNavigate();
//     const handleSubmit = async () => {
//         try {
//             const bookingForm = {
//                 customerId,
//                 listingId,
//                 hostId: listing.creator._id,
//                 startDate: dateRange[0].startDate.toISOString(),
//                 endDate: dateRange[0].endDate.toISOString(),
//                 totalPrice: listing.price * dayCount,
//             };

//             const response = await fetch(
//                 "http://localhost:3000/api/v1/bookings/create",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(bookingForm),
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success("Booking request sent to the owner!");
//                 // Redirect to home/listings page after 1 second
//                 setTimeout(() => {
//                     navigate("/"); // "/" is your home page
//                 }, 1000);
//             } else {
//                 toast.error(data.msg || "Failed to send booking request");
//             }
//         } catch (error) {
//             console.error(error.message);
//             toast.error("Failed to send booking request");
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/v1/properties/${listingId}`,
//                 {
//                     method: "DELETE",
//                 }
//             );

//             if (response.ok) {
//                 toast.success("Listing deleted successfully!");
//                 navigate(`/`); // redirect to home or listings page
//             } else {
//                 toast.error("Failed to delete listing");
//             }
//         } catch (error) {
//             toast.error("Failed to delete listing");
//         }
//     };


//     return loading ? (
//         <Loader />
//     ) : (
//         <>
//             <Navbar />
//             <div className="listing-details">
//                 <Toaster position='top-center' reverseOrder={false} />
//                 <div className="title">
//                     <h1>{listing.title}</h1>
//                     <div></div>
//                 </div>

//                 <div className="photos">
//                     {listing.listingPhotoPaths?.map((photo, index) => (
//                         <img
//                             src={`http://localhost:3000/${photo.replace("public/", "")}`}
//                             alt={`photo ${index + 1}`}
//                         />

//                     ))}
//                 </div>

//                 <h2>
//                     {listing.streetAddress}
//                     <br />
//                     {listing.type} in {listing.city}
//                     {listing.country}
//                 </h2>
//                 <p>
//                     {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
//                     {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
//                 </p>
//                 <hr />

//                 <div className="profile">
//                     <img
//                         src={`http://localhost:3000/${listing.creator.profileImagePath.replace(
//                             "public",
//                             ""
//                         )}`}
//                     />
//                     <h3>
//                         Hosted by {listing.creator.firstName} {listing.creator.lastName}
//                     </h3>
//                 </div>
//                 <hr />

//                 {/* //delete button */}
//                 {isCreator && (
//                     <button
//                         className="delete-button"
//                         onClick={handleDelete}
//                         style={{
//                             backgroundColor: "red",
//                             color: "white",
//                             border: "none",
//                             padding: "10px 20px",
//                             borderRadius: "8px",
//                             cursor: "pointer",
//                             marginBottom: "20px"
//                         }}
//                     >
//                         Delete Listing
//                     </button>
//                 )}
//                 <hr />


//                 <h3>Description</h3>
//                 <p>{listing.description}</p>
//                 <hr />

//                 <h3>{listing.highlight}</h3>
//                 <p>{listing.highlightDesc}</p>
//                 <hr />

//                 <div className="booking">
//                     <div>
//                         <h2>What this place offers?</h2>
//                         <div className="amenities">
//                             {listing.amenities[0].split(",").map((item, index) => (
//                                 <div className="facility" key={index}>
//                                     <div className="facility_icon">
//                                         {
//                                             facilities.find((facility) => facility.name === item)
//                                                 ?.icon
//                                         }
//                                     </div>
//                                     <p>{item}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {!isCreator && (
//                     <div>
//                         <h2>How long do you want to stay?</h2>
//                         <div className="date-range-calendar">
//                             <DateRange ranges={dateRange} onChange={handleSelect} />
//                             {dayCount > 1 ? (
//                                 <h2>
//                                     ₹{listing.price} x {dayCount} Days
//                                 </h2>
//                             ) : (
//                                 <h2>
//                                     ₹{listing.price} x {dayCount} Day
//                                 </h2>
//                             )}
//                             <h2>Total price: ₹{listing.price * dayCount}</h2>
//                             <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
//                             <p>End Date: {dateRange[0].endDate.toDateString()}</p>
//                             <button className="button" type="submit" onClick={handleSubmit}>
//                                 BOOKING
//                             </button>
//                         </div>
//                     </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ListingDetails;


import React, { useEffect, useState } from "react";
import "../../Styles/ListingDetails.scss";

import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../../catDB";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../../Components/Loader";
import Navbar from "../../Components/Navbar";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY"); // Add your Stripe key

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const customerId = useSelector((state) => state?.user?._id);
  const isCreator = listing?.creator?._id === customerId;
  const navigate = useNavigate();

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/properties/${listingId}`
      );
      const data = await response.json();
      setListing(data.listingOK);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch listing details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  const handleSelect = (ranges) => setDateRange([ranges.selection]);

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) || 1;

  /** Handle Stripe Payment */
  const handleBooking = async () => {
    const totalPrice = listing.price * dayCount;
    try {
      const stripe = await stripePromise;

      const res = await fetch(
        "http://localhost:3000/api/v1/payments/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingId,
            customerId,
            totalPrice,
            startDate: dateRange[0].startDate,
            endDate: dateRange[0].endDate,
            hostId: listing.creator._id,
          }),
        }
      );

      const data = await res.json();

      if (!data.sessionId) {
        toast.error("Payment session failed!");
        return;
      }

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (result.error) toast.error(result.error.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="listing-details">
        <h1>{listing.title}</h1>

        <div className="photos">
          {listing.listingPhotoPaths?.map((photo, index) => (
            <img
              key={index}
              src={`http://localhost:3000/${photo.replace("public/", "")}`}
              alt={`photo ${index + 1}`}
            />
          ))}
        </div>

        <h2>
          {listing.streetAddress}, {listing.city}, {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests • {listing.bedroomCount} bedroom(s) • {listing.bedCount} bed(s) • {listing.bathroomCount} bath(s)
        </p>

        {/* Only guest can book */}
        {!isCreator && (
          <div className="booking">
            <h2>Choose your dates</h2>
            <DateRange ranges={dateRange} onChange={handleSelect} />
            <p>
              {dayCount} {dayCount > 1 ? "days" : "day"} • Total: ₹{listing.price * dayCount}
            </p>
            <button className="button" onClick={handleBooking}>
              BOOKING
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListingDetails;
