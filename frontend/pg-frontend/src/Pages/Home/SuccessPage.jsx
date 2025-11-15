import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingData = {
      listingId: params.get("listingId"),
      customerId: params.get("customerId"),
      totalPrice: params.get("totalPrice"),
      startDate: params.get("startDate"),
      endDate: params.get("endDate"),
      hostId: params.get("hostId"),
    };

    fetch("http://localhost:3000/api/v1/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then(() => toast.success("Booking completed successfully!"))
      .finally(() => navigate("/"));
  }, []);

  return <h2>Processing your booking...</h2>;
};

export default SuccessPage;
