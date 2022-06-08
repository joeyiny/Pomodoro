import "./App.css";
import { RoomContext } from "./context/RoomContext";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useSound from "use-sound";
import { useContext } from "react";
import Header from "./components/Header";

const alarmSound = require("./sounds/alarm.wav");
const joinSound = require("./sounds/join.wav");

function App() {
  const { socket, newUserEffectOn, setNewUserEffectOn } =
    useContext(RoomContext);

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
    <div className="text-center bg-gray-900 min-h-screen App-header text-white ">
      <div className="m-auto max-w-2xl">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
