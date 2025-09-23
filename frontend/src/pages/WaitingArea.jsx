import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/booking", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  return (
    <div>
      <h1>Your Video Call Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b._id}>
              {b.astrologer?.name || "Unknown Astrologer"} —{" "}
              {new Date(b.startTime).toLocaleString()}
              {"  "}
              <button onClick={() => navigate(`/room/${b._id}`)}>Join</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
