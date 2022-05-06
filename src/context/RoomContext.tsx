import { createContext, useEffect, useState } from "react";
import { User } from "../App";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./GlobalContext";
import Peer from "peerjs";

let serverUrl = process.env.REACT_APP_SERVER;
if (!serverUrl) {
  throw new Error("serverUrl not set in env file");
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(serverUrl);

// type VideoCallType = {
//   peerId: string;
//   stream: MediaStream;
// };

export type RoomContextType = {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  connectedUsers: Array<User>;
  currentUserName: string;
  setCurrentUserName: any;
  setConnectedUsers: any;
  socket: Socket;
  mediaStream: MediaStream | null;
  peerStreams: Array<MediaStream>;
};

export const RoomContext = createContext<RoomContextType>({
  roomCode: "",
  setRoomCode: () => {},
  connectedUsers: [],
  currentUserName: "",
  setCurrentUserName: () => {},
  setConnectedUsers: () => {},
  socket: socket,
  mediaStream: null,
  peerStreams: [],
});

export const RoomProvider: any = ({ children }: { children: any }) => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<Array<User>>([]);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer>();
  const [peerStreams, setPeerStreams] = useState<MediaStream[]>([]);

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
        console.log("call answered");
        peerStreams.push(peerStream);
      });
    });

    socket.on("new-user-joined-video", (userId) => {
      if (socket.id !== userId) {
        const call = peer.call(userId, mediaStream);
        call.on("stream", (peerStream) => {
          console.log("call made");
          peerStreams.push(peerStream);
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
      }}>
      {children}
    </RoomContext.Provider>
  );
};
