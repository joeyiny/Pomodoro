import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types/SocketEvents";
import Peer from "peerjs";
import { TimerContext } from "./TimerContext";
import { TasksContext } from "./TasksContext";
import { AuthContext } from "./AuthContext";

let serverUrl = process.env.REACT_APP_SERVER;
if (!serverUrl) {
  throw new Error("serverUrl not set in env file");
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(serverUrl);

export type RoomContextType = {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  connectedUsers: { [peerId: string]: User };
  setConnectedUsers: any;
  socket: Socket;
  mediaStream: MediaStream | null;
  peerStreams: Array<{ peerId: string; stream: MediaStream }>;
  newUserEffectOn: boolean;
  setNewUserEffectOn: Dispatch<SetStateAction<boolean>>;
  toggleScreenShare: () => void;
  isScreenSharing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  isAudioOn: boolean | null;
  isVideoOn: boolean | null;
  chats: Array<any>;
};

export const RoomContext = createContext<RoomContextType>({
  roomCode: "",
  setRoomCode: () => {},
  connectedUsers: {},
  setConnectedUsers: () => {},
  socket: socket,
  mediaStream: null,
  peerStreams: [],
  newUserEffectOn: false,
  setNewUserEffectOn: () => {},
  toggleScreenShare: () => {},
  isScreenSharing: false,
  toggleAudio: () => {},
  toggleVideo: () => {},
  isAudioOn: null,
  isVideoOn: null,
  chats: [],
});

export const RoomProvider: any = ({ children }: { children: any }) => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<{
    [peerId: string]: User;
  }>({});
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer>();
  const [peerStreams, setPeerStreams] = useState<
    { peerId: string; stream: MediaStream }[]
  >([]);
  const { setSeconds, setTimerOn, setSessionType } = useContext(TimerContext);
  const { setCompletedPomodoros } = useContext(TasksContext);
  const { user } = useContext(AuthContext);
  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean | null>(null);
  const [isVideoOn, setIsVideoOn] = useState<boolean | null>(null);
  const [chats, setChats] = useState<Array<any>>([]);

  useEffect(() => {
    socket.on("timer-tick", (data) => setSeconds(data));
    socket.on("timer-toggle", (data) => setTimerOn(data));
    socket.on("set-session-type", (data) => setSessionType(data));
    socket.on("connected-users", (data) => {
      setConnectedUsers(data);
    });
    socket.on("new-user-connected", () => {
      setNewUserEffectOn(true);
    });
    socket.on("completed-pomo", () => {
      setCompletedPomodoros((completedPomodoros) => completedPomodoros + 1);
    });
    socket.on("joined-room", (code: string) => {
      setRoomCode(code);
    });
    socket.on("chat", (chat) => {
      setChats((c) => c.concat(chat));
    });
    socket.on("user-disconnected", (userId) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!roomCode || !user) return;
    const p = new Peer(socket.id);
    setPeer(p);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMediaStream(stream);
          socket.emit("video-ready", roomCode);
        });
    } catch (error) {
      console.error(error);
    }
  }, [roomCode, user]);

  let toggleVideo = () => {
    if (!mediaStream) return;
    const videoTrack = mediaStream
      .getTracks()
      .find((track) => track.kind === "video");
    if (!videoTrack) return;
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
    } else {
      videoTrack.enabled = true;
    }
    setIsVideoOn(videoTrack.enabled);
  };

  let toggleAudio = () => {
    if (!mediaStream) return;
    const audioTrack = mediaStream
      .getTracks()
      .find((track) => track.kind === "audio");
    if (!audioTrack) return;
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
    } else {
      audioTrack.enabled = true;
    }
    setIsAudioOn(audioTrack.enabled);
  };

  useEffect(() => {
    if (!mediaStream) return;
    const audioTrack = mediaStream
      .getTracks()
      .find((track) => track.kind === "audio");
    const videoTrack = mediaStream
      .getTracks()
      .find((track) => track.kind === "video");
    if (!audioTrack) return;
    setIsAudioOn(audioTrack.enabled);
    if (!videoTrack) return;
    setIsVideoOn(videoTrack.enabled);
  }, [mediaStream]);

  let toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then((stream) => {
            setMediaStream(stream);
            setIsScreenSharing(true);
            Object.values(peer?.connections).forEach((connection: any) => {
              const videoTrack = stream
                ?.getTracks()
                .find((track) => track.kind === "video");
              connection[0].peerConnection
                .getSenders()[1]
                .replaceTrack(videoTrack)
                .catch((err: any) => console.log(err));
            });
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setMediaStream(stream);
            setIsScreenSharing(false);
            Object.values(peer?.connections).forEach((connection: any) => {
              const videoTrack = stream
                ?.getTracks()
                .find((track) => track.kind === "video");
              connection[0].peerConnection
                .getSenders()[1]
                .replaceTrack(videoTrack)
                .catch((err: any) => console.log(err));
            });
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!peer || !mediaStream) return;

    peer.on("call", (call) => {
      call.answer(mediaStream);
      call.on("stream", (peerStream) => {
        console.log("Answered call");
        setPeerStreams((peerStreams) => {
          if (!peerStreams.find((e) => e.peerId === call.peer)) {
            return [...peerStreams, { peerId: call.peer, stream: peerStream }];
          }
          return peerStreams;
        });
      });
    });

    socket.on("new-user-joined-video", (userId) => {
      if (socket.id !== userId) {
        const call = peer.call(userId, mediaStream);
        call.on("stream", (peerStream) => {
          console.log("Calling " + userId);
          setPeerStreams((peerStreams) => {
            if (!peerStreams.find((e) => e.peerId === userId))
              return [...peerStreams, { peerId: userId, stream: peerStream }];
            return peerStreams;
          });
        });
      }
    });
  }, [peer, mediaStream]);

  return (
    <RoomContext.Provider
      value={{
        roomCode,
        setRoomCode,
        connectedUsers,
        setConnectedUsers,
        socket,
        mediaStream,
        peerStreams,
        newUserEffectOn,
        setNewUserEffectOn,
        toggleScreenShare,
        isScreenSharing,
        toggleAudio,
        toggleVideo,
        isAudioOn,
        isVideoOn,
        chats,
      }}>
      {children}
    </RoomContext.Provider>
  );
};
