import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";

import { Task } from "../types/Task";
import { AuthContext } from "./AuthContext";
import { RoomContext } from "./RoomContext";

export type TasksContextType = {
  tasks: Array<Task>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  selectTask: (taskIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
  selectedTaskIndex: number | null;
  iterateNumberOfPomodorosForSelectedTask: () => void;
  completedPomodorosToday: number;
  setCompletedPomodorosToday: Dispatch<SetStateAction<number>>;
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
  completedPomodorosToday: 0,
  setCompletedPomodorosToday: () => {},
  toggleCompleteTask: () => {},
});

export const TasksProvider = ({ children }: { children: any }) => {
  const { socket } = useContext(RoomContext);
  const { user, isFetching } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [completedPomodorosToday, setCompletedPomodorosToday] =
    useState<number>(0);
  const [totalCompletedPomodoros, setTotalCompletedPomodoros] =
    useState<number>(0);

  let addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    socket.on("completed-pomo", () => {
      setCompletedPomodorosToday(
        (completedPomodoros) => completedPomodoros + 1
      );
    });
  }, []);

  let deleteTask = (taskIndex: number) => {
    let newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);
    setTasks(newTasks);
    if (selectedTaskIndex === null) return;
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

  useEffect(() => {
    socket.emit("update-tasks", user, tasks);
  }, [tasks, socket, user]);

  useEffect(() => {
    if (user.tasks) setTasks(user.tasks);
    if (user.completedPomodoros) {
      setTotalCompletedPomodoros(user.completedPomodoros.length);
      let todaysPomos = user.completedPomodoros.filter(
        (pomo: { date: Date }) => {
          let today = new Date();
          let pomoDate = new Date(pomo.date);
          return (
            today.getFullYear() === pomoDate.getFullYear() &&
            today.getMonth() === pomoDate.getMonth() &&
            today.getDate() === pomoDate.getDate()
          );
        }
      );
      setCompletedPomodorosToday(todaysPomos.length);
    }
  }, [user, isFetching]);

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
        completedPomodorosToday: completedPomodorosToday,
        setCompletedPomodorosToday: setCompletedPomodorosToday,
        toggleCompleteTask,
      }}>
      {children}
    </TasksContext.Provider>
  );
};
