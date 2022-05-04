import "./App.css";
import { Task } from "./types/Task";
import {
  SessionType,
  TimerContextType,
  TasksContextType,
} from "./types/GlobalContext";
import { RoomContext } from "./context/RoomContext";

import { createContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useSound from "use-sound";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const alarmSound = require("./sounds/alarm.wav");
const joinSound = require("./sounds/join.wav");

export type User = {
  roomCode: string;
  userName: string;
};

export const TasksContext = createContext<TasksContextType>({
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
  setSessionType: () => {},
  setSeconds: () => {},
  setTimerOn: () => {},
});

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
  const [playJoinSound] = useSound(joinSound, { volume: 0.4 });

  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);

  const { setConnectedUsers, setRoomCode } = useContext(RoomContext);
  const { socket } = useContext(RoomContext);

  useEffect(() => {
    const taskData = localStorage.getItem("tasks");
    const selectedTaskIndexData = localStorage.getItem("selectedTaskIndex");
    const completedPomodorosData = localStorage.getItem("completedPomodoros");
    setTasks(JSON.parse(taskData || "[]"));
    setSelectedTaskIndex(JSON.parse(selectedTaskIndexData || "null"));
    setCompletedPomodoros(JSON.parse(completedPomodorosData || "0"));
    if (taskData === "{}") setTasks([]);
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
    </TasksContext.Provider>
  );
}

export default App;
