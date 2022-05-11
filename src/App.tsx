import "./App.css";
import { TasksContext } from "./context/TasksContext";
import { RoomContext } from "./context/RoomContext";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useSound from "use-sound";
import { useContext } from "react";
import { TimerContext } from "./context/TimerContext";

const alarmSound = require("./sounds/alarm.wav");
const joinSound = require("./sounds/join.wav");

function App() {
  const { setCompletedPomodoros } = useContext(TasksContext);
  const { setSeconds, setTimerOn, setSessionType } = useContext(TimerContext);
  const {
    setConnectedUsers,
    setRoomCode,
    socket,
    newUserEffectOn,
    setNewUserEffectOn,
  } = useContext(RoomContext);

  const [playAlarmSound] = useSound(alarmSound, { volume: 0.4 });
  const [playJoinSound] = useSound(joinSound, { volume: 0.4 });

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

  useEffect(() => {
    socket.on("new-user-connected", () => {
      playJoinSound();
    });
    socket.on("timer-complete", () => {
      playAlarmSound();
    });
  }, [playAlarmSound, playJoinSound]);

  return (
    <div className="text-center bg-gray-800 min-h-screen App-header text-white  ">
      <Outlet />
    </div>
  );
}

export default App;
