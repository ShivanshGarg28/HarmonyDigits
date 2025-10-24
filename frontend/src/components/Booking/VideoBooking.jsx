import { useDispatch, useSelector } from "react-redux";
import { createBooking, resetLatestBooking } from "../../redux/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ASTROLOGER_ID = "689b8fc652104c2c0746eede";

const VideoBookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { latestBooking, loading, error } = useSelector((s) => s.bookings);

  const handleBook = () => {
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
      <button
        onClick={handleBook}
        disabled={loading}
        className="px-8 py-4 w-52 bg-sky-600 text-white rounded-full"
      >
        {loading ? "Booking..." : "Book Video Call"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default VideoBookingPage;
