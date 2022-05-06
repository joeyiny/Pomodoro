import { Dispatch, SetStateAction, createContext } from "react";

import { User } from "../types/User";
import { Task } from "../types/Task";
import { SessionType } from "../types/Session";

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

export type TimerContextType = {
  seconds: number;
  timerOn: boolean;
  sessionType: SessionType;
  roomCode?: string;
  setSessionType?: any;
  setTimerOn?: any;
  setSeconds?: any;
};
