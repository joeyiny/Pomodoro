import { useContext, useEffect, useRef, useState } from "react";
import { RoomContext } from "../context/RoomContext";

const Video = ({ stream }: { stream: MediaStream }) => {
  let localVideo = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState<boolean>(true);

  useEffect(() => {
    if (localVideo.current) localVideo.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="block border border-red-500 w-32">
      <video className="w-full block" muted={muted} ref={localVideo} autoPlay />
      <button onClick={() => setMuted(!muted)}>
        {muted ? "unmute" : "mute"}
      </button>
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
    <div className="">
      <video className="w-32" muted ref={videoRef} autoPlay />
      {peerStreams.map((s, key) => {
        return <Video stream={s} key={key} />;
      })}
    </div>
  );
};

export default UserVideos;
