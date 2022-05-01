import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  RoomContext,
  SocketContext,
  TasksContext,
  TimerContext,
  User,
} from "../App";
import ConnectedUsers from "../components/ConnectedUsers";
import NewUserNotification from "../components/notifications/NewUserNotification";
import ProgressSection from "../components/ProgressSection";
import TimeEstimation from "../components/TimeEstimation";
import Timer from "../components/Timer";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../types/GlobalContext";

const RoomScreen = () => {
  const [connectedUsers, setConnectedUsers] = useState<Array<User>>([]);

  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);
  const { tasks, setCompletedPomodoros, completedPomodoros } =
    useContext(TasksContext);
  const { socket } = useContext(SocketContext);
  const {
    setSeconds,
    setTimerOn,
    setSessionType,
    sessionType,
    timerOn,
    seconds,
  } = useContext(TimerContext);
  const { roomCode, setIsInRoom, setRoomCode } = useContext(RoomContext);

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

  // useEffect(() => {
  //   socket.on("timer-tick", (data) => setSeconds(data));
  //   socket.on("timer-toggle", (data) => setTimerOn(data));
  //   socket.on("set-session-type", (data) => setSessionType(data));
  //   socket.on("connected-users", (data) => {
  //     setConnectedUsers(data);
  //   });
  //   socket.on("new-user-connected", () => {
  //     // playJoinSound();
  //     setNewUserEffectOn(true);
  //   });
  //   socket.on("timer-complete", () => {
  //     // playAlarmSound();
  //     setCompletedPomodoros(completedPomodoros + 1);
  //   });
  //   socket.on("joined-room", (code: string) => {
  //     setIsInRoom(true);
  //     setRoomCode(code);
  //   });
  // }, []);

  let params = useParams();
  return (
    <div>
      {newUserEffectOn && <NewUserNotification />}
      <div className="text-center bg-gray-800 min-h-screen">
        <div className="App-header text-white  flex gap-2 flex-col w-96 m-auto py-10">
          <p>Room Code: {roomCode}</p>
          <ConnectedUsers connectedUsers={connectedUsers} />
          <ProgressSection />
          <Timer socket={socket} />
          {/* <Tasks /> */}
          {tasks.length > 0 && <TimeEstimation />}
        </div>
      </div>
    </div>
  );
};

export default RoomScreen;
