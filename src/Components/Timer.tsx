import { useEffect, useState } from "react";
import useSound from "use-sound";
const alarmSound = require("../sounds/alarm.wav");

enum SessionType {
  POMODORO = "pomodoro",
  SHORTBREAK = "shortbreak",
  LONGBREAK = "longbreak",
}

let Timer = () => {
  const [seconds, setSeconds] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.POMODORO
  );

  let toggle = () => {
    setIsActive(!isActive);
  };

  const [playAlarmSound, { stop }] = useSound(alarmSound, { volume: 0.4 });

  let reset = () => {
    setIsActive(false);
    setSeconds(25 * 60);
    stop();
  };

  let increment = () => {
    if (!isActive) setSeconds(() => seconds + 60);
  };

  let decrement = () => {
    if (!isActive) {
      if (seconds >= 60) {
        setSeconds(() => seconds - 60);
      } else {
        setSeconds(0);
      }
    }
  };

  let getTimestamp = () => {
    let minutes = Math.floor(seconds / 60);
    let minutesDisplay = minutes <= 9 ? "0" + minutes : minutes;
    let secondsDisplay =
      seconds % 60 <= 9 ? "0" + (seconds % 60) : seconds % 60;
    return minutesDisplay + ":" + secondsDisplay;
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (seconds <= 0) {
        clearInterval(interval);
        setIsActive(false);
        playAlarmSound();
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <div>
        <span>{sessionType}</span>
      </div>
      <h1>{getTimestamp()}</h1>
      <div>
        <button disabled={isActive} onClick={() => decrement()}>
          -
        </button>
        <button disabled={isActive} onClick={() => increment()}>
          +
        </button>
      </div>
      <div>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => toggle()}>{isActive ? "Stop" : "Start"}</button>
      </div>
    </>
  );
};

export default Timer;
