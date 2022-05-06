import React, { useContext, useEffect, useRef } from "react";
import { RoomContext } from "../context/RoomContext";

const Video = ({ stream }: { stream: MediaStream }) => {
  let localVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideo.current) localVideo.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="block">
      <video className="w-32" ref={localVideo} autoPlay />
    </div>
  );
};

const UserVideos = () => {
  let { mediaStream, peerStreams } = useContext(RoomContext);
  let videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  return (
    <div>
      <video className="w-32" muted ref={videoRef} autoPlay />
      {peerStreams.map((s, key) => {
        return <Video stream={s} key={key} />;
      })}
    </div>
  );
};

export default UserVideos;
