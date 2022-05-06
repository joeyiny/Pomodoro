import "./App.css";
import { TasksContext } from "./context/TasksContext";
import { RoomContext } from "./context/RoomContext";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useSound from "use-sound";
import { useContext } from "react";
import { TimerContext, TimerProvider } from "./context/TimerContext";
const alarmSound = require("./sounds/alarm.wav");
const joinSound = require("./sounds/join.wav");

function App() {
  const { setCompletedPomodoros } = useContext(TasksContext);
  const { setSeconds, setTimerOn, setSessionType } = useContext(TimerContext);
  const { setConnectedUsers, setRoomCode, socket } = useContext(RoomContext);

  const [playAlarmSound] = useSound(alarmSound, { volume: 0.4 });
  const [playJoinSound] = useSound(joinSound, { volume: 0.4 });

  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);

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

  return <Outlet />;
}

export default App;
