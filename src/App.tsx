import "./App.css";
import { Task } from "./types/Task";
import { TimerContextType } from "./context/GlobalContext";
import { TasksContext, TasksContextType } from "./context/TasksContext";
import { SessionType } from "./types/Session";
import { RoomContext } from "./context/RoomContext";

import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useSound from "use-sound";
import { useContext } from "react";
const alarmSound = require("./sounds/alarm.wav");
const joinSound = require("./sounds/join.wav");

export const TimerContext = createContext<TimerContextType>({
  seconds: 1500,
  timerOn: false,
  sessionType: SessionType.POMODORO,
  setSessionType: () => {},
  setSeconds: () => {},
  setTimerOn: () => {},
});

function App() {
  const [seconds, setSeconds] = useState<number>(1500);
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.POMODORO
  );
  const { setCompletedPomodoros } = useContext(TasksContext);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  const [playAlarmSound] = useSound(alarmSound, { volume: 0.4 });
  const [playJoinSound] = useSound(joinSound, { volume: 0.4 });

  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);

  const { setConnectedUsers, setRoomCode } = useContext(RoomContext);
  const { socket } = useContext(RoomContext);

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

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
      console.log("1");
    });
    socket.on("joined-room", (code: string) => {
      setRoomCode(code);
    });
  }, []);

  useEffect(() => {
    socket.on("new-user-connected", () => {
      playJoinSound();
    });
    socket.on("timer-complete", () => {
      playAlarmSound();
    });
  }, [playAlarmSound, playJoinSound]);

  return (
    <TimerContext.Provider
      value={{
        seconds,
        timerOn,
        sessionType,
        setSeconds,
        setTimerOn,
        setSessionType,
      }}>
      <Outlet />
    </TimerContext.Provider>
  );
}

export default App;
