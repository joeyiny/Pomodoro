import { createContext, useState } from "react";
import { User } from "../App";

export type RoomContextType = {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  connectedUsers: Array<User>;
  currentUserName: string;
  setCurrentUserName: any;
  setConnectedUsers: any;
};

export const RoomContext = createContext<RoomContextType>({
  roomCode: "",
  setRoomCode: () => {},
  connectedUsers: [],
  currentUserName: "",
  setCurrentUserName: () => {},
  setConnectedUsers: () => {},
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
      }}>
      {children}
    </RoomContext.Provider>
  );
};
