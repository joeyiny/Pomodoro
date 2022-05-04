import { createContext, useEffect, useState } from "react";
import { User } from "../App";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../types/GlobalContext";
import Peer from "peerjs";

let serverUrl = process.env.REACT_APP_SERVER;
if (!serverUrl) {
  throw new Error("serverUrl not set in env file");
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(serverUrl);

export type RoomContextType = {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  connectedUsers: Array<User>;
  currentUserName: string;
  setCurrentUserName: any;
  setConnectedUsers: any;
  socket: Socket;
  mediaStream: MediaStream | null;
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
});

export const RoomProvider: any = ({ children }: { children: any }) => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<Array<User>>([]);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<Peer>();

  useEffect(() => {
    const p = new Peer(socket.id);
    setPeer(p);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMediaStream(stream);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!peer || !mediaStream) return;
    console.log(peer, mediaStream);
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
      }}>
      {children}
    </RoomContext.Provider>
  );
};
