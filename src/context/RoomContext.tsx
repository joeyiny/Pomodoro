import { createContext, useState } from "react";
import { User } from "../App";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../types/GlobalContext";

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
};

export const RoomContext = createContext<RoomContextType>({
  roomCode: "",
  setRoomCode: () => {},
  connectedUsers: [],
  currentUserName: "",
  setCurrentUserName: () => {},
  setConnectedUsers: () => {},
  socket: socket,
});

export const RoomProvider: any = ({ children }: { children: any }) => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [connectedUsers, setConnectedUsers] = useState<Array<User>>([]);
  const [currentUserName, setCurrentUserName] = useState<string>("");

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
      }}>
      {children}
    </RoomContext.Provider>
  );
};
