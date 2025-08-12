// pages/Room/index.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
  const { roomId: bookingId } = useParams(); // bookingId
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMeeting = async () => {
      try {
        // 1️⃣ Fetch booking & validate time on backend
        const res = await fetch(`/api/bookings/${bookingId}/room`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          alert(errData.error || "Unable to join meeting");
          navigate("/");
          return;
        }

        const { roomId, userName } = await res.json(); 
        // 🔹 Make sure backend returns BOTH roomId and the authenticated user's display name

        // 2️⃣ Generate kitToken with dynamic name
        
        const appID = 556479662;
        const serverSecret = "dc2a4ca608dbf42d86885b31b7294a5f";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(), // userID — should be unique
          userName               // dynamic name from backend
        );

        // 3️⃣ Join the meeting
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: false,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Error joining meeting");
        navigate("/");
      }
    };

    initMeeting();
  }, [bookingId, navigate]);

  if (loading) return <p>Loading meeting...</p>;

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default RoomPage;
