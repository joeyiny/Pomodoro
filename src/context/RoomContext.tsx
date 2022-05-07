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
  currentUserName: string;
  setCurrentUserName: any;
  setConnectedUsers: any;
  socket: Socket;
  mediaStream: MediaStream | null;
  peerStreams: Array<{ peerId: string; stream: MediaStream }>;
  newUserEffectOn: boolean;
  setNewUserEffectOn: Dispatch<SetStateAction<boolean>>;
};

export const RoomContext = createContext<RoomContextType>({
  roomCode: "",
  setRoomCode: () => {},
  connectedUsers: {},
  currentUserName: "",
  setCurrentUserName: () => {},
  setConnectedUsers: () => {},
  socket: socket,
  mediaStream: null,
  peerStreams: [],
  newUserEffectOn: false,
  setNewUserEffectOn: () => {},
});

export const RoomProvider: any = ({ children }: { children: any }) => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<{
    [peerId: string]: User;
  }>({});
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer>();
  const [peerStreams, setPeerStreams] = useState<
    { peerId: string; stream: MediaStream }[]
  >([]);
  const { setSeconds, setTimerOn, setSessionType } = useContext(TimerContext);
  const { setCompletedPomodoros } = useContext(TasksContext);
  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);

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
    socket.on("user-disconnected", (userId) => {
      let newStreams = [...peerStreams];
      newStreams.filter((e) => e.peerId === userId);
      setPeerStreams(newStreams);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!roomCode) return;
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
  }, [roomCode]);

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
        currentUserName,
        setCurrentUserName,
        setConnectedUsers,
        socket,
        mediaStream,
        peerStreams,
        newUserEffectOn,
        setNewUserEffectOn,
      }}>
      {children}
    </RoomContext.Provider>
  );
};
