import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCallingIndex = () => {
  const { bookingId } = useParams();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}/room`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        let data;
        try {
          data = await res.json();
        } catch {
          alert("Invalid server response");
          return navigate("/");
        }

        if (!res.ok) {
          alert(data.error || "Unable to join meeting");
          return navigate("/");
        }

        const appID = 556479662;
        const serverSecret = "dc2a4ca608dbf42d86885b31b7294a5f";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          data.roomId,
          Date.now().toString(),
          data.userName
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
          container: containerRef.current,
          scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
          showScreenSharingButton: false,
        });

        setLoading(false);
      } catch (err) {
        alert("Error joining meeting");
        navigate("/");
      }
    };
    init();
  }, [bookingId, navigate]);

  if (loading) return <p>Loading...</p>;
  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default VideoCallingIndex;
