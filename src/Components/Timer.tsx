import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../App";
import useSound from "use-sound";
const alarmSound = require("../sounds/alarm.wav");

enum SessionType {
  POMODORO = "Pomodoro",
  SHORTBREAK = "Short Break",
  LONGBREAK = "Long Break",
}

let Timer = () => {
  const [seconds, setSeconds] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.POMODORO
  );
  const {
    iterateNumberOfPomodorosForSelectedTask,
    completedPomodoros,
    setCompletedPomodoros,
  } = useContext(TasksContext);

  let toggle = () => {
    setIsActive(!isActive);
  };

  const [playAlarmSound, { stop }] = useSound(alarmSound, { volume: 0.4 });

  let reset = (sessionType: SessionType) => {
    let minutesToCountdown;
    switch (sessionType) {
      case SessionType.POMODORO:
        minutesToCountdown = 25;
        break;
      case SessionType.SHORTBREAK:
        minutesToCountdown = 5;
        break;
      case SessionType.LONGBREAK:
        minutesToCountdown = 15;
        break;
    }
    setIsActive(false);
    setSeconds(minutesToCountdown * 60);
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

  let setSession = (sessionType: SessionType) => {
    setSessionType(sessionType);
    reset(sessionType);
  };

  useEffect(() => {
    if (!isActive) {
      document.title = "My Pomo";
      return;
    }
    let affirmation = "Time to focus!";
    if (sessionType === SessionType.SHORTBREAK)
      affirmation = "Enjoy your break!";
    document.title = getTimestamp() + " - " + affirmation;
  }, [seconds, isActive, sessionType]);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (seconds <= 0) {
        clearInterval(interval);
        setIsActive(false);
        if (sessionType === SessionType.POMODORO) {
          setCompletedPomodoros((completedPomodoros) => completedPomodoros + 1);
          iterateNumberOfPomodorosForSelectedTask();
          setSession(SessionType.SHORTBREAK);
        } else {
          setSession(SessionType.POMODORO);
        }

        playAlarmSound();
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, playAlarmSound]);

  return (
    <div className="bg-gray-800 p-5 rounded-md flex gap-5 flex-col">
      <div className="flex gap-3 text-lg">
        <span
          className={`${
            sessionType === SessionType.POMODORO && "font-bold bg-gray-900"
          } cursor-pointer px-2 py-1 rounded`}
          onClick={() => setSession(SessionType.POMODORO)}>
          {SessionType.POMODORO}
        </span>
        <span
          className={`${
            sessionType === SessionType.SHORTBREAK && "font-bold bg-gray-900"
          } cursor-pointer px-2 py-1 rounded`}
          onClick={() => setSession(SessionType.SHORTBREAK)}>
          {SessionType.SHORTBREAK}
        </span>
        <span
          className={`${
            sessionType === SessionType.LONGBREAK && "font-bold bg-gray-900"
          } cursor-pointer px-2 py-1 rounded`}
          onClick={() => setSession(SessionType.LONGBREAK)}>
          {SessionType.LONGBREAK}
        </span>
      </div>
      <span id="timer" className="flex gap-2 justify-between">
        <button
          className="border-2 disabled:border-gray-700 disabled:text-gray-700 w-12 rounded-md"
          disabled={isActive}
          onClick={() => decrement()}>
          -
        </button>
        <span className="font-bold text-6xl">{getTimestamp()}</span>
        <button
          className="border-2 disabled:border-gray-700 disabled:text-gray-700 w-12 rounded-md"
          disabled={isActive}
          onClick={() => increment()}>
          +
        </button>
      </span>
      <div className="flex gap-2 text-base justify-center">
        {/* <button onClick={() => reset(sessionType)} className="border-2">
          Reset
        </button> */}
        <button
          onClick={() => toggle()}
          className="border-2 w-24 p-2 text-xl uppercase font-bold rounded-md">
          {isActive ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
