import "./App.css";
import Tasks from "./components/Tasks";
import Timer from "./components/Timer";
import TimeEstimation from "./components/TimeEstimation";
import ProgressSection from "./components/ProgressSection";
import { Task } from "./types/Task";
import {
  GlobalContext,
  SessionType,
  TimerContextType,
} from "./types/GlobalContext";

import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useSound from "use-sound";
import NewUserNotification from "./components/notifications/NewUserNotification";
import ConnectedUsers from "./components/ConnectedUsers";
const alarmSound = require("./sounds/alarm.wav");
const joinSound = require("./sounds/join.wav");

export const TasksContext = createContext<GlobalContext>({
  tasks: [],
  setTasks: () => {},
  addTask: (e) => {},
  selectTask: (e) => {},
  deleteTask: (e) => {},
  selectedTaskIndex: null,
  iterateNumberOfPomodorosForSelectedTask: () => {},
  completedPomodoros: 0,
  setCompletedPomodoros: () => {},
  toggleCompleteTask: () => {},
});

export const TimerContext = createContext<TimerContextType>({
  seconds: 1500,
  timerOn: false,
  sessionType: SessionType.POMODORO,
});

const socket = io("localhost:3001");

function App() {
  const [isInRoom, setIsInRoom] = useState<boolean>(false);

  const [seconds, setSeconds] = useState<number>(1500);
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.POMODORO
  );
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [connectedUsers, setConnectedUsers] = useState<number>(0);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);

  const [playAlarmSound] = useSound(alarmSound, { volume: 0.4 });
  const [playJoinSound] = useSound(joinSound, { volume: 0.4 });

  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);

  useEffect(() => {
    const taskData = localStorage.getItem("tasks");
    const selectedTaskIndexData = localStorage.getItem("selectedTaskIndex");
    const completedPomodorosData = localStorage.getItem("completedPomodoros");
    setTasks(JSON.parse(taskData || "{}"));
    setSelectedTaskIndex(JSON.parse(selectedTaskIndexData || "null"));
    setCompletedPomodoros(JSON.parse(completedPomodorosData || "0"));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

  useEffect(() => {
    socket.on("timer-tick", (data) => setSeconds(data));
    socket.on("timer-toggle", (data) => setTimerOn(data));
    socket.on("set-session-type", (data) => setSessionType(data));
    socket.on("connected-users", (data) => setConnectedUsers(data));
    socket.on("new-user-connected", () => {
      playJoinSound();
      setNewUserEffectOn(true);
    });
    socket.on("timer-complete", () => {
      playAlarmSound();
      setCompletedPomodoros(completedPomodoros + 1);
    });
  }, [playAlarmSound, playJoinSound]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem(
      "selectedTaskIndex",
      selectedTaskIndex !== null ? selectedTaskIndex?.toString() : "null"
    );
    localStorage.setItem(
      "completedPomodoros",
      completedPomodoros ? completedPomodoros.toString() : "null"
    );
  });

  let addTask = (task: Task) => {
    setTasks([...tasks, task]);
    setSelectedTaskIndex(tasks.length);
  };

  let deleteTask = (taskIndex: number) => {
    let newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);
    setTasks(newTasks);
  };

  let toggleCompleteTask = (taskIndex: number) => {
    let newTasks = [...tasks];
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
    setTasks(newTasks);
  };

  let iterateNumberOfPomodorosForSelectedTask = () => {
    if (selectedTaskIndex === null || selectedTaskIndex >= tasks.length) return;
    let newTasks = [...tasks];
    //@ts-ignore
    newTasks[selectedTaskIndex].pomodorosCompleted++;
    setTasks(newTasks);
  };

  let selectTask = (taskIndex: number) => {
    setSelectedTaskIndex(taskIndex);
  };

  if (!isInRoom)
    return (
      <div className="text-center bg-gray-800 min-h-screen">
        <div className="App-header text-white flex gap-2 flex-col w-96 m-auto py-10">
          <p className="">Join a room:</p>
          <div className="flex flex-row gap-2">
            <input
              className="text-gray-900 flex-grow px-1 py-0.5"
              placeholder="Enter room code"
              type="text"
            />
            <button className="border-2 border-white rounded  w-min px-2 py-1">
              Join
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        selectTask,
        deleteTask,
        selectedTaskIndex,
        iterateNumberOfPomodorosForSelectedTask,
        completedPomodoros,
        setCompletedPomodoros,
        toggleCompleteTask,
      }}>
      {newUserEffectOn && <NewUserNotification />}
      <div className="text-center bg-gray-800 min-h-screen">
        <div className="App-header text-white  flex gap-2 flex-col w-96 m-auto py-10">
          <ConnectedUsers connectedUsers={connectedUsers} />
          <ProgressSection />
          <TimerContext.Provider value={{ seconds, timerOn, sessionType }}>
            <Timer socket={socket} />
          </TimerContext.Provider>
          <Tasks />
          {tasks.length > 0 && <TimeEstimation />}
        </div>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
