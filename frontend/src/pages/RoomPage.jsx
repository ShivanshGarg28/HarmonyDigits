// pages/RoomPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
  const { bookingId } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMeeting = async () => {
      try {
        const res = await fetch(`/api/booking/${bookingId}/room`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          alert(errData.error || "Unable to join meeting");
          navigate("/");
          return;
        }

        const { roomId, userName, userId } = await res.json();

        if (!roomId || !userName) {
          alert("Invalid room details from server");
          navigate("/");
          return;
        }

        const appID = 556479662;
        const serverSecret = "dc2a4ca608dbf42d86885b31b7294a5f";

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          userId || Date.now().toString(), // fallback to timestamp
          userName
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: false,
          showRoomTimer: true,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error initializing meeting:", err);
        alert("Error joining meeting");
        navigate("/");
      }
    };

    if (bookingId) {
      initMeeting();
    } else {
      alert("Invalid booking ID");
      navigate("/");
    }
  }, [bookingId, navigate]);

  if (loading) return <p className="text-center mt-20">Loading meeting...</p>;

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default RoomPage;
