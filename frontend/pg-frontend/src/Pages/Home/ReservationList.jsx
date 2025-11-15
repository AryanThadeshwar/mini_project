// import React ,{ useEffect, useState } from "react";
// import "../../Styles/TripList.scss";
// import Loader from "../../Components/Loader";
// import Navbar from "../../Components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../../redux/state";
// import ListingCard from "../../Components/ListingCard";
// // import Footer from "../components/Footer"

// const ReservationList = () => {
//     const [loading, setLoading] = useState(true);
//     const user = useSelector((state) => state.user);
//     const reservationList = useSelector((state) => state.user.reservationList);

//     const dispatch = useDispatch();

//     const getReservationList = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/v1/users/${user._id}/reservations`,
//                 {
//                     method: "GET",
//                 }
//             );

//             const data = await response.json();
//             dispatch(setReservationList(data));
//             setLoading(false);
//         } catch (err) {
//             console.log("Fetch Reservation List failed!", err.message);
//         }
//     };

//     useEffect(() => {
//         getReservationList();
//     }, []);

//     return loading ? (
//         <Loader />
//     ) : (
//         <>
//             <Navbar />
//             <h1 className="title-list">Your Reservation List</h1>
//             <div className="list">
//                 {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
//                     <ListingCard
//                         listingId={listingId._id}
//                         creator={hostId._id}
//                         listingPhotoPaths={listingId.listingPhotoPaths}
//                         city={listingId.city}
//                         province={listingId.province}
//                         country={listingId.country}
//                         category={listingId.category}
//                         startDate={startDate}
//                         endDate={endDate}
//                         totalPrice={totalPrice}
//                         booking={booking}
//                     />
//                 ))}
//             </div>
//             {/* <Footer /> */}
//         </>
//     );
// };

// export default ReservationList;


import React, { useEffect, useState } from "react";
import "../../Styles/TripList.scss";
import Loader from "../../Components/Loader";
import Navbar from "../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../../redux/state";
import ListingCard from "../../Components/ListingCard";
import toast, { Toaster } from "react-hot-toast";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // For payment/details card

  const user = useSelector((state) => state.user);
  const reservationList = useSelector((state) => state.user.reservationList);
  const dispatch = useDispatch();

  // Fetch reservations for this user
  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${user._id}/reservations`,
        { method: "GET" }
      );
      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
      toast.error("Failed to fetch reservations");
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  // Accept booking
  const handleAccept = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/bookings/${bookingId}/accept`,
        { method: "PATCH" }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to accept");
      toast.success("Booking accepted!");
      setSelectedBooking(data.booking); // Show payment/details card
      getReservationList(); // Refresh list
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to accept booking");
    }
  };

  // Deny booking
  const handleDeny = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/bookings/${bookingId}/deny`,
        { method: "PATCH" }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to deny");
      toast.success("Booking denied!");
      getReservationList(); // Refresh list
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to deny booking");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.map(
          ({
            _id,
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            status = "pending",
          }) => (
            <div key={_id} className="booking-card">
              <ListingCard
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={true}
              />

              {/* Accept / Deny buttons only for pending bookings */}
              {status === "pending" && (
                <div className="booking-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(_id)}
                  >
                    Accept
                  </button>
                  <button
                    className="deny-btn"
                    onClick={() => handleDeny(_id)}
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Payment / Booking Details Card */}
      {selectedBooking && selectedBooking.status === "accepted" && (
        <div className="payment-card">
          <h2>Payment / Booking Details</h2>
          <p>
            Guest: {selectedBooking.customer.firstName}{" "}
            {selectedBooking.customer.lastName}
          </p>
          <p>Property: {selectedBooking.property.title}</p>
          <p>
            Dates: {new Date(selectedBooking.startDate).toDateString()} -{" "}
            {new Date(selectedBooking.endDate).toDateString()}
          </p>
          <p>Total Price: ₹{selectedBooking.totalPrice}</p>
          <p>Contact: {selectedBooking.customer.email}</p>
        </div>
      )}
    </>
  );
};

export default ReservationList;
