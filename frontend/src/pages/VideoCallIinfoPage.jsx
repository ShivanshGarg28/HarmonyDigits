import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../redux/slices/bookingSlice";

const VideoCallInfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { latestBooking, loading, error } = useSelector((state) => state.bookings);

  const handlePayClick = async () => {
    const astrologerId = "689b8fc652104c2c0746eede"; // use valid astrologer ID

    const startTimeISO = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min from now
    const durationMinutes = 45;
    const resultAction = await dispatch(
      createBooking({ astrologerId, startTimeISO, durationMinutes })
    );

    if (createBooking.fulfilled.match(resultAction)) {
      navigate(`/room/${resultAction.payload.bookingId}`);
    } else {
      alert(resultAction.payload || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="bg-green-50 p-10 rounded-2xl shadow-xl max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">Live Video Consultation</h1>
        <p className="text-lg text-gray-700 mb-4">
          Talk directly with <b>Astrologer Geetu Parmar</b> via secure video call.
        </p>
        <ul className="text-gray-600 text-left mb-6 list-disc list-inside">
          <li>45 minutes personalized consultation</li>
          <li>Detailed Kundali analysis + 1 year prediction</li>
          <li>Effective remedies provided</li>
          <li>Complete privacy guaranteed</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Price: ₹3100</h2>
        <button
          onClick={handlePayClick}
          disabled={loading}
          className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Booking..." : "Pay & Book Now"}
        </button>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default VideoCallInfoPage;
