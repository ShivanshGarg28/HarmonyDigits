// frontend/src/pages/BookingPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { createBooking, resetLatestBooking } from "../../redux/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Replace with your astrologer Id
const ASTROLOGER_ID = "689b8fc652104c2c0746eede";

const VideoBookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { latestBooking, loading, error } = useSelector((state) => state.bookings);

  const handleBookVideoCall = () => {
    const startTimeISO = new Date().toISOString();
    dispatch(createBooking({ astrologerId: ASTROLOGER_ID, startTimeISO, durationMinutes: 30 }));
  };

  useEffect(() => {
    if (latestBooking && latestBooking.bookingId) {
      navigate(`/room/${latestBooking.bookingId}`);
      dispatch(resetLatestBooking());
    }
  }, [latestBooking, navigate, dispatch]);

  return (
    <div>
      {/* ...rest of BookingPage layout */}
      <button
        onClick={handleBookVideoCall}
        className="px-8 py-4 w-52 rounded-full bg-sky-600 text-white font-semibold text-lg shadow-lg transform transition-all hover:scale-105 hover:bg-sky-700 text-center"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Video Call"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
export default VideoBookingPage;
