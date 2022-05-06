import { useContext, useEffect } from "react";
import { TimerContext } from "../context/TimerContext";
import { RoomContext } from "../context/RoomContext";
import { SessionType } from "../types/Session";

let Timer = ({ socket }: { socket: any }) => {
  const { seconds, timerOn, sessionType } = useContext(TimerContext);
  const { roomCode } = useContext(RoomContext);

  let getTimestamp = () => {
    let minutes = Math.floor(seconds / 60);
    let minutesDisplay = minutes <= 9 ? "0" + minutes : minutes;
    let secondsDisplay =
      seconds % 60 <= 9 ? "0" + (seconds % 60) : seconds % 60;
    return minutesDisplay + ":" + secondsDisplay;
  };

  useEffect(() => {
    if (!timerOn) {
      document.title = "My Pomo";
      return;
    }
    let affirmation = "Time to focus!";
    if (sessionType === SessionType.SHORTBREAK)
      affirmation = "Enjoy your break!";
    document.title = getTimestamp() + " - " + affirmation;
  }, [seconds, timerOn, sessionType]);

  return (
    <div className="bg-gray-700 p-5 rounded-md flex gap-5 flex-col">
      <div className="flex gap-3 text-lg">
        <button
          className={`${
            sessionType === SessionType.POMODORO && "font-bold bg-gray-800"
          } cursor-pointer px-2 py-1 rounded`}
          onClick={() => {
            socket.emit("session-type-switch", roomCode, SessionType.POMODORO);
          }}>
          {SessionType.POMODORO}
        </button>
        <button
          className={`${
            sessionType === SessionType.SHORTBREAK && "font-bold bg-gray-800"
          } cursor-pointer px-2 py-1 rounded`}
          onClick={() => {
            socket.emit(
              "session-type-switch",
              roomCode,
              SessionType.SHORTBREAK
            );
          }}>
          {SessionType.SHORTBREAK}
        </button>
        <button
          className={`${
            sessionType === SessionType.LONGBREAK && "font-bold bg-gray-800"
          } cursor-pointer px-2 py-1 rounded`}
          onClick={() => {
            socket.emit("session-type-switch", roomCode, SessionType.LONGBREAK);
          }}>
          {SessionType.LONGBREAK}
        </button>
      </div>
      <span id="timer" className="flex gap-2 justify-between">
        <button
          className="border-2 disabled:border-gray-700 disabled:text-gray-700 w-12 rounded-md"
          disabled={timerOn}
          onClick={() => {
            socket.emit("decrement-button-press", roomCode);
          }}>
          -
        </button>
        <span className="font-bold text-6xl">{getTimestamp()}</span>
        <button
          className="border-2 disabled:border-gray-700 disabled:text-gray-700 w-12 rounded-md"
          disabled={timerOn}
          onClick={() => {
            socket.emit("increment-button-press", roomCode);
          }}>
          +
        </button>
      </span>
      <div className="flex gap-2 text-base justify-center">
        <button
          onClick={() => {
            socket.emit("toggle-button-press", roomCode);
          }}
          className="border-2 w-24 p-2 text-xl uppercase font-bold rounded-md">
          {timerOn ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
