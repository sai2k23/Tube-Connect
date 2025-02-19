import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../src/Context/SocketContext.js";
import { getReceivedVideos } from "../action/video.js";
import "./ReceivedVideos.css";

const ReceivedVideos = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentuserreducer);
    const receivedVideos = useSelector(state => state.videoreducer.receivedVideos) || [];
    const { socket } = useSocket();

    useEffect(() => {
        if (!currentUser || !currentUser?.result?.email) {
            console.warn("⚠️ No email found! Ensure the user is logged in.");
            return;
        }

        const userEmail = currentUser.result.email;
        console.log("🔍 Fetching received videos for:", userEmail);
        dispatch(getReceivedVideos(userEmail));

        // ✅ Listen for real-time updates
        const handleVideoShared = (newVideo) => {
            if (newVideo.receiverEmail === userEmail) {
                dispatch({ type: "FETCH_RECEIVED_VIDEOS", payload: [newVideo, ...receivedVideos] });
            }
        };

        socket.on("videoShared", handleVideoShared);

        return () => {
            socket.off("videoShared", handleVideoShared);
        };
    }, [socket, currentUser, dispatch, receivedVideos]);

    return (
        <div className="received-videos-container">
            <h2>📥 Videos Shared with You</h2>
            {currentUser && currentUser?.result?.email ? (
                receivedVideos.length > 0 ? (
                    receivedVideos.map((video, index) => (
                        <div className="video-item" key={video.videoId || index}>
                            <video className="video-player" controls src={`http://localhost:5000/${video.filepath}`}></video>
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p>📤 Shared by: {video.sharedBy || "Unknown"}</p>
                                {video.message && <p>📝 Message: {video.message}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-videos">No received videos yet.</p>
                )
            ) : (
                <p className="warning">⚠️ Please log in to view shared videos.</p>
            )}
        </div>
    );
};

export default ReceivedVideos;
