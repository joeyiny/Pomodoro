import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  createContext,
} from "react";

import { Task } from "../types/Task";

export type TasksContextType = {
  tasks: Array<Task>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  selectTask: (taskIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
  selectedTaskIndex: number | null;
  iterateNumberOfPomodorosForSelectedTask: () => void;
  completedPomodoros: number;
  setCompletedPomodoros: Dispatch<SetStateAction<number>>;
  toggleCompleteTask: (taskIndex: number) => void;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: () => {},
  addTask: () => {},
  selectTask: () => {},
  deleteTask: () => {},
  selectedTaskIndex: null,
  iterateNumberOfPomodorosForSelectedTask: () => {},
  completedPomodoros: 0,
  setCompletedPomodoros: () => {},
  toggleCompleteTask: () => {},
});

export const TasksProvider = ({ children }: { children: any }) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);

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
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem(
      "selectedTaskIndex",
      selectedTaskIndex !== null ? selectedTaskIndex?.toString() : "null"
    );
    localStorage.setItem(
      "completedPomodoros",
      completedPomodoros ? completedPomodoros.toString() : "null"
    );
  }, [tasks, completedPomodoros, selectedTaskIndex]);

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
      {children}
    </TasksContext.Provider>
  );
};