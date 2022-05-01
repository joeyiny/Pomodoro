import { Dispatch, SetStateAction } from "react";
import { Task } from "./Task";

export enum SessionType {
  POMODORO = "Pomodoro",
  SHORTBREAK = "Short Break",
  LONGBREAK = "Long Break",
}

export type GlobalContext = {
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
