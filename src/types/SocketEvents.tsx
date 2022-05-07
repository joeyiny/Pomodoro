import { SessionType } from "./Session";
import { User } from "./User";

export interface ServerToClientEvents {
  "joined-room": (code: string) => void;
  "timer-tick": (seconds: number) => void;
  "timer-toggle": (timerOn: boolean) => void;
  "set-session-type": (sessionType: SessionType) => void;
  "connected-users": (users: User[]) => void;
  "new-user-connected": (userId: string) => void;
  "timer-complete": () => void;
  "completed-pomo": () => void;
  "new-user-joined-video": (userId: string) => void;
  "user-disconnected": (userId: string) => void;
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
  "video-ready": (roomCode: string) => void;
}
export interface InterServerEvents {
  ping: () => void;
}
export interface SocketData {
  name: string;
  age: number;
}
