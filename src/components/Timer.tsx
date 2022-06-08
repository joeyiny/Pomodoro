import { useContext, useEffect } from "react";
import { TimerContext } from "../context/TimerContext";
import { RoomContext } from "../context/RoomContext";
import { SessionType } from "../types/Session";
import Card from "./Card";

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
      document.title = "Pomo.wtf";
      return;
    }
    let affirmation = "Time to focus!";
    if (sessionType === SessionType.SHORTBREAK)
      affirmation = "Enjoy your break!";
    document.title = getTimestamp() + " - " + affirmation;
  }, [seconds, timerOn, sessionType]);

  return (
    <Card>
      <div className="flex gap-4 text-sm m-auto">
        <button
          className={`${
            sessionType !== SessionType.POMODORO && " text-gray-500"
          } cursor-pointer rounded font-bold uppercase`}
          onClick={() => {
            socket.emit("session-type-switch", roomCode, SessionType.POMODORO);
          }}>
          {SessionType.POMODORO}
        </button>
        <button
          className={`${
            sessionType !== SessionType.LONGBREAK && " text-gray-500"
          } cursor-pointerrounded font-bold uppercase`}
          onClick={() => {
            socket.emit("session-type-switch", roomCode, SessionType.LONGBREAK);
          }}>
          Break
        </button>
      </div>
      <span id="timer" className="flex gap-2 justify-between">
        <button
          className="border-2 disabled:border-gray-700 disabled:hidden w-12 rounded-md"
          disabled={timerOn || sessionType === SessionType.POMODORO}
          onClick={() => {
            socket.emit("decrement-button-press", roomCode);
          }}>
          -
        </button>
        <span className="font-black m-auto text-6xl">{getTimestamp()}</span>
        <button
          className="border-2 disabled:border-gray-700 disabled:hidden w-12 rounded-md"
          disabled={timerOn || sessionType === SessionType.POMODORO}
          onClick={() => {
            socket.emit("increment-button-press", roomCode);
          }}>
          +
        </button>
      </span>
      <div className="">
        <button
          onClick={() => {
            socket.emit("toggle-button-press", roomCode);
          }}
          className="bg-primary h-8 px-4 text-sm font-extrabold uppercase rounded-full text-gray-900">
          {timerOn ? "Stop" : "Start"}
        </button>
      </div>
    </Card>
  );
};

export default Timer;
