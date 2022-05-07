import { useContext, useEffect, useRef, useState } from "react";
import { RoomContext } from "../context/RoomContext";

const MutedLogo = ({ muted }: { muted: boolean }) => {
  if (muted)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 28 28">
        <path d="M20.455 0l-3.234 3.984-7.221 4.016v2.288l3.836-2.136-5.844 7.198v-7.35h-4.992v10h2.842l-3.842 4.731 1.545 1.269 18.455-22.731-1.545-1.269zm-14.455 16h-1v-6h1v6zm13-8.642v15.642l-8.749-4.865 1.277-1.573 5.472 3.039v-9.779l2-2.464z" />
      </svg>
    );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 28 28">
      <path d="M22 0v24l-11-6v-2.278l9 4.909v-17.262l-9 4.91v-2.279l11-6zm-13 6v12h-7v-12h7zm-2 2h-3v8h3v-8z" />
    </svg>
  );
};

const Video = ({ stream, name }: { stream: MediaStream; name: string }) => {
  let localVideo = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    if (localVideo.current) localVideo.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="block border w-32 m-auto">
      <video className="w-full block" muted={muted} ref={localVideo} autoPlay />
      {/* <button onClick={() => setMuted(!muted)}>
        {muted ? "unmute" : "mute"}
      </button> */}

      {/* <p>{connectedUsers[s.peerId] && connectedUsers[s.peerId].userName}</p> */}
      <div className="flex flex-row justify-center items-center gap-1">
        <p>{name}</p>
        <div onClick={() => setMuted(!muted)}>
          <MutedLogo muted={muted} />
        </div>
      </div>
    </div>
  );
};

const UserVideos = () => {
  let { mediaStream, peerStreams, connectedUsers, currentUserName } =
    useContext(RoomContext);
  let videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  return (
    <div className="">
      <div>
        <video className="w-32 m-auto" muted ref={videoRef} autoPlay />
        <p>{currentUserName}</p>
      </div>

      {peerStreams.map((s, key) => {
        return (
          <div key={key}>
            {connectedUsers[s.peerId] && (
              <Video
                stream={s.stream}
                name={connectedUsers[s.peerId].userName}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserVideos;
