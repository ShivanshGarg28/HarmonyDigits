// pages/Home/index.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setBookings(data); // expecting array of bookings
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Your Video Call Bookings</h1>
      {bookings.length === 0 && <p>No bookings found</p>}
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.astrologer?.name} — {new Date(b.startTime).toLocaleString()}
            {"  "}
            <button onClick={() => navigate(`/room/${b._id}`)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
