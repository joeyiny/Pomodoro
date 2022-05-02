import { Dispatch, SetStateAction, createContext } from "react";
import { io, Socket } from "socket.io-client";

import { User } from "../App";
import { Task } from "./Task";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io("localhost:3001");

export enum SessionType {
  POMODORO = "Pomodoro",
  SHORTBREAK = "Short Break",
  LONGBREAK = "Long Break",
}

export type TasksContextType = {
  tasks: Array<Task>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  selectTask: (taskIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
  selectedTaskIndex: number | null;
  iterateNumberOfPomodorosForSelectedTask: () => void;
  completedPomodoros: number;
  setCompletedPomodoros: Dispatch<SetStateAction<number>>;
  toggleCompleteTask: (taskIndex: number) => void;
};

export type TimerContextType = {
  seconds: number;
  timerOn: boolean;
  sessionType: SessionType;
  roomCode?: string;
  setSessionType?: any;
  setTimerOn?: any;
  setSeconds?: any;
};

export type RoomContextType = {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  connectedUsers: Array<User>;
  currentUserName: string;
  setCurrentUserName: any;
};

export type SocketContextType = {
  socket: Socket | null;
};

export const SocketContext = createContext({
  socket: socket,
});

export const SocketProvider: any = ({ children }: { children: any }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export interface ServerToClientEvents {
  "joined-room": (code: string) => void;
  "timer-tick": (seconds: number) => void;
  "timer-toggle": (timerOn: boolean) => void;
  "set-session-type": (sessionType: SessionType) => void;
  "connected-users": (data: any) => void;
  "new-user-connected": () => void;
  "timer-complete": () => void;
}

export interface ClientToServerEvents {
  "toggle-button-press": (roomCode: string) => void;
  "increment-button-press": () => void;
  "decrement-button-press": () => void;
  "session-type-switch": (sessionType: SessionType) => void;
  "create-room": (
    userNameInput: string,
    callback: (roomCode: string) => void
  ) => void;
  "join-room": (user: User, callback: (roomExists: boolean) => void) => {};
  "check-if-room-exists": (
    roomCode: string,
    callback: (response: { roomCode: string; exists: boolean }) => void
  ) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
