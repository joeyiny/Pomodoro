import React, { useEffect } from "react";

var localVideoref = React.createRef<HTMLVideoElement>();
const UserVideos = () => {
  useEffect(() => {
    var constraints = {
      video: true,
      audio: true,
    };
    async function getMedia(constraints: { video: boolean; audio: boolean }) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!localVideoref.current) return;
        localVideoref.current.srcObject = stream;
        localVideoref.current.srcObject = stream;
        localVideoref.current.muted = true;
        localVideoref.current.play();
      } catch (err) {
        console.log(err);
      }
    }
    getMedia(constraints);
  }, [localVideoref]);

  return (
    <div>
      <video className="w-32" ref={localVideoref} autoPlay />
    </div>
  );
};

export default UserVideos;
