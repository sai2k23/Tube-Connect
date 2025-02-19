import Video from "../Models/videofile.js"; // Your Video model
import SharedVideo from "../Models/SharedVideo.js";
import Notification from "../Models/Notification.js";


// Share multiple videos
export const shareMultipleVideos = async (req, res) => {
    try {
        console.log("📩 Received Request:", req.body); // ✅ Debug incoming data

        const { videos } = req.body;
        if (!videos || !Array.isArray(videos)) {
            return res.status(400).json({ error: "Invalid video data format" });
        }

        const sharedVideos = videos.map(video => {
            if (!video.receiverEmail || !video.videoId || !video.filepath) {
                console.error("\u274c Missing required video properties:", video);
                return null;
            }
            return {
                videoId: video.videoId,
                title: video.title || video.videotitle,
                filepath: video.filepath,
                sharedBy: video.sharedBy,
                uploader: video.uploader || "Unknown",
                receiverEmail: video.receiverEmail,
                message: video.message || "",
                createdAt: new Date()
            };
        }).filter(video => video !== null);

        console.log("✅ Data to Insert:", sharedVideos); // ✅ Log processed data

        await SharedVideo.insertMany(sharedVideos);
         // ✅ Save notification
         const notifications = videos.map(video => ({
            recipientEmail: video.receiverEmail,
            senderEmail: video.sharedBy,
            videoTitle: video.title || "New Video",
            message: video.message || "A new video has been shared with you!",
            isRead: false
        }));

        await Notification.insertMany(notifications);

        if (req.io) {
            sharedVideos.forEach(video => {
                if (video.receiverEmail) {
                    console.log(`⚡ Emitting to room: ${video.receiverEmail}`); // ✅ Debug Log
                    req.io.to(video.receiverEmail).emit("video-shared", {
                        senderEmail: video.sharedBy,
                        videoTitle: video.title || "New Video",
                        message: video.message || "A new video has been shared with you!",
                        filepath: video.filepath
                    });
                    console.log(`📢 Sent real-time notification to ${video.receiverEmail}`);
                }
            });
        } else {
            console.warn("⚠️ req.io is not available, skipping real-time notifications");
        }
        
    
        res.status(201).json({ message: "Videos shared successfully!" });
    } catch (error) {
        console.error("❌ Error sharing videos:", error); // ✅ Log exact error
        res.status(500).json({ error: "Failed to share videos" });
    }
};



// ✅ Controller function to fetch shared videos for a user
export const getSharedVideos = async (req, res) => {
    const { receiverEmail } = req.query; // Receiver's email from request

    try {
        const videos = await SharedVideo.find({ receiverEmail });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching shared videos" });
    }
};


// ✅ Controller function to fetch received videos for a user
export const getReceivedVideos = async (req, res) => {
    const { receiverEmail } = req.query;

    try {
        if (!receiverEmail) {
            return res.status(400).json({ error: "Receiver email is required" });
        }

        const receivedVideos = await SharedVideo.find({ receiverEmail }).sort({ createdAt: -1 });
        
        res.status(200).json(receivedVideos);
    } catch (error) {
        console.error("❌ Error fetching received videos:", error);
        res.status(500).json({ error: "Failed to fetch received videos" });
    }
};
