// frontend/src/pages/VideoCallHome.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings } from "../../redux/slices/bookingSlice";
import { useNavigate } from "react-router-dom";

const VIdeoCallHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  return (
    <div>
      <h1>Your Video Call Bookings</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length === 0 && !loading && <p>No bookings found</p>}
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.astrologer?.firstName} — {new Date(b.startTime).toLocaleString()}
            {"  "}
            <button onClick={() => navigate(`/room/${b._id}`)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VIdeoCallHome;
