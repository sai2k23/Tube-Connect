import React from "react";
import "./Shorts.css";
import vid from "../../Components/Video/vid.mp4";

const Shortslist = [
  {
        _id: 1,
        video_src: vid,
        chanel: "SAGE",
        title: "video 1",
        uploader: "abc",
        description: "description of video 1"
      },
      {
        _id: 1,
        video_src: vid,
        chanel: "SAGE",
        title: "video 1",
        uploader: "abc",
        description: "description of video 1"
      },
      {
        _id: 2,
        video_src: vid,
        chanel: "SAGE",
        title: "video 1",
        uploader: "abc",
        description: "description of video 2"
      },
      {
        _id: 3,
        video_src: vid,
        chanel: "SAGE",
        title: "video 1",
        uploader: "abc",
        description: "description of video 3"
      },
      {
        _id: 4,
        video_src: vid,
        chanel: "SAGE",
        title: "video 1",
        uploader: "abc",
        description: "description of video 4"
      },
];

const Shorts = () => {
  return (
    <div className="shorts-container">
      {Shortslist.map((shortVideo) => (
        <div key={shortVideo._id} className="short-video-card">
          <video
            className="short-video"
            src={shortVideo.video_src}
            controls
            loop
            autoPlay
            muted
          ></video>

          <div className="short-video-details">
            <p className="uploader">{shortVideo.uploader}</p>
            <p className="title">{shortVideo.title}</p>
            <p className="description">{shortVideo.description}</p>
          </div>
          <div className="short-actions">
            <button className="like">👍</button>
            <button className="dislike">👎</button>
            <button className="comments">💬</button>
            <button className="share">↗️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shorts;
