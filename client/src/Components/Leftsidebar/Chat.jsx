import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import { useSocket } from "../../Context/SocketContext";
import { getvideos, shareMultipleVideos } from "../../Api/index";

const motivationalQuotes = [
  "Believe in yourself and all that you are!",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it."
];

const Chat = () => {
  const currentUser = useSelector(state => state.currentuserreducer);
  const [sharedVideos, setSharedVideos] = useState([]);
  const [quote, setQuote] = useState("");
  const { socket } = useSocket();

  const [allVideos, setAllVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

    const fetchVideos = async () => {
      try {
        const { data } = await getvideos();
        setAllVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();

    if (socket && currentUser?.email) {
      socket.emit("join", currentUser.email);
      console.log(`✅ Joined socket room: ${currentUser.email}`);

      socket.on("video-shared", (newVideo) => {
        console.log("📩 Received shared video notification on frontend:", newVideo);
        setSharedVideos((prev) => [newVideo, ...prev]);

        if (Notification.permission === "granted") {
          new Notification("📢 New Video Shared!", {
            body: `From: ${newVideo.senderEmail}\nTitle: ${newVideo.videoTitle}`,
            icon: "/notification-icon.png",
          });
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("video-shared");
      }
    };
  }, [socket, currentUser]);

  const handleShareVideo = async () => {
    if (!selectedVideo || !receiverEmail) {
      alert("Please select a video and enter a recipient email.");
      return;
    }

    try {
      const videoData = {
        receiverEmail,
        sharedBy: currentUser?.name || "Anonymous",
        uploader: selectedVideo.uploader || currentUser?.name,
        videoId: selectedVideo._id,
        title: selectedVideo.videotitle,
        filepath: selectedVideo.filepath,
        message
      };

      const response = await shareMultipleVideos([videoData]);

      if (!response.data) throw new Error("Failed to share video");

      console.log("Video shared successfully!");
      setSharedVideos((prev) => [videoData, ...prev]);
      setMessage("");
      setReceiverEmail("");
      setSelectedVideo(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error sharing video:", error.response?.data || error.message);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">📢 Welcome to the Chat Section, {currentUser?.name}!</h1>
      <p className="chat-quote">💡 {quote}</p>

      <div className="floating-action" onClick={() => setShowForm(!showForm)}>
        {showForm ? "✖ Close" : "➕ Share Video"}
      </div>

      {showForm && (
        <div className="share-form">
          <div className="form-field">
            <label>Receiver's Email:</label>
            <input
              type="email"
              placeholder="Enter recipient's email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Select a Video:</label>
            <select
              value={selectedVideo?._id || ""}
              onChange={(e) => {
                const selected = allVideos.find(v => v._id === e.target.value);
                setSelectedVideo(selected);
              }}
            >
              <option value="">-- Select a Video --</option>
              {allVideos.map((video) => (
                <option key={video._id} value={video._id}>
                  {video.videotitle}
                </option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Add a message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={handleShareVideo} className="share-video-btn">
            📤 Share
          </button>
        </div>
      )}

      <div className="video-list">
        {sharedVideos.length > 0 ? (
          sharedVideos.map((video, index) => (
            <div className="video-card" key={index}>
              <video className="video-player" controls src={`http://localhost:5000/${video.filepath}`}></video>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>Shared by: {video.sharedBy || "Unknown"}</p>
                <p>📩 Sent to: {video.receiverEmail}</p>
                {video.message && <p>📝 Message: {video.message}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="no-videos">No shared videos yet.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
