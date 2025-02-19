import React, { useState, useEffect } from "react";
import { getvideos, shareMultipleVideos } from "../../Api/index"; // ✅ Import API

const ShareVideos = ({ user }) => {
  const [videos, setVideos] = useState([]);  // All available videos
  const [selectedVideos, setSelectedVideos] = useState([]);  // Selected videos to share
  const [recipientEmail, setRecipientEmail] = useState("");  // Receiver's email

  useEffect(() => {
    // ✅ Fetch user's videos from API
    const fetchVideos = async () => {
      try {
        const { data } = await getvideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleShare = async () => {
    if (!recipientEmail || selectedVideos.length === 0) {
      alert("Please select at least one video and enter a recipient email.");
      return;
    }

    try {
      const videoData = selectedVideos.map((video) => ({
        receiverEmail: recipientEmail,
        sharedBy: user?.name || "Anonymous",
        uploader: video.uploader || user?.name,
        videoId: video._id,
        title: video.videotitle, 
        filepath: video.filepath,
      }));

      const response = await shareMultipleVideos(videoData);

      if (!response.data) throw new Error("Failed to share videos");

      console.log("Videos shared successfully!");
      setSelectedVideos([]); // Reset selected videos
      setRecipientEmail(""); // Reset email field
    } catch (error) {
      console.error("Error sharing videos:", error.response?.data || error.message);
    }
  };

  return (
    <div className="share-videos-container">
      <h2>📢 Share Videos</h2>

      {/* ✅ Input field for Receiver's Email */}
      <div>
        <label>Receiver's Email:</label>
        <input
          type="email"
          placeholder="Enter recipient's email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
      </div>

      {/* ✅ List of available videos with checkboxes */}
      <div className="video-list">
        <h3>Select Videos to Share:</h3>
        {videos.map((video) => (
          <div key={video._id}>
            <input
              type="checkbox"
              checked={selectedVideos.includes(video)}
              onChange={() =>
                setSelectedVideos((prev) =>
                  prev.includes(video)
                    ? prev.filter((v) => v._id !== video._id)
                    : [...prev, video]
                )
              }
            />
            {video.videotitle}
          </div>
        ))}
      </div>

      <button onClick={handleShare} className="share-video-btn">Share Selected Videos</button>
    </div>
  );
};

export default ShareVideos;
