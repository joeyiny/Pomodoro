import React, { useContext, useEffect, useRef } from "react";
import { RoomContext } from "../context/RoomContext";

// var localVideoref = React.createRef<HTMLVideoElement>();
const UserVideos = () => {
  let { mediaStream } = useContext(RoomContext);
  let videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  // useEffect(() => {
  //   var constraints = {
  //     video: true,
  //     audio: true,
  //   };
  //   async function getMedia(constraints: { video: boolean; audio: boolean }) {
  //     let stream = null;
  //     try {
  //       if (!localVideoref.current)return;
  //       localVideoref.current.srcObject = mediaStream;
  //       localVideoref.current.srcObject = mediaStream;
  //       localVideoref.current.muted = true;
  //       localVideoref.current.play();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getMedia(constraints);
  // }, [mediaStream]);

  return (
    <div>
      <video className="w-32" muted ref={videoRef} autoPlay />
    </div>
  );
};

export default UserVideos;
