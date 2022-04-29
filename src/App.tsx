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
const alarmSound = require("./sounds/alarm.wav");

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

const socket = io("http://localhost:3001");

function App() {
  const [seconds, setSeconds] = useState<number>(1500);
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.POMODORO
  );
  const [timerOn, setTimerOn] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);

  const [playAlarmSound] = useSound(alarmSound, { volume: 0.4 });

  useEffect(() => {
    const taskData = localStorage.getItem("tasks");
    const selectedTaskIndexData = localStorage.getItem("selectedTaskIndex");
    const completedPomodorosData = localStorage.getItem("completedPomodoros");
    setTasks(JSON.parse(taskData || "{}"));
    setSelectedTaskIndex(JSON.parse(selectedTaskIndexData || "null"));
    setCompletedPomodoros(JSON.parse(completedPomodorosData || "0"));
  }, []);

  useEffect(() => {
    socket.on("timer-tick", (data) => setSeconds(data));
    socket.on("timer-toggle", (data) => setTimerOn(data));
    socket.on("set-session-type", (data) => setSessionType(data));
    socket.on("timer-complete", () => {
      playAlarmSound();
      setCompletedPomodoros(completedPomodoros + 1);
    });
  }, [playAlarmSound]);

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
      <div className="text-center bg-gray-800 min-h-screen">
        <div className="App-header text-white  flex gap-2 flex-col w-96 m-auto py-10">
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
