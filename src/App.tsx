import "./App.css";
import Tasks from "./Components/TaskList.tsx";
import Timer from "./Components/Timer.tsx";
import TimeEstimation from "./Components/TimeEstimation.tsx";

import { createContext, useState } from "react";

export type Task = {
  title: string;
  selected: boolean;
  pomodorosCompleted?: number;
  pomodoroGoal: number;
  completed: boolean;
  note?: string;
};

export const TasksContext = createContext({});

function App() {
  let [tasks, setTasks] = useState<Array<Task>>([]);
  let [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);

  let addTask = (task) => {
    setTasks([...tasks, task]);
    setSelectedTaskIndex(tasks.length);
  };

  let deleteTask = (taskIndex) => {
    console.log(taskIndex);
    let newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);
    setTasks(newTasks);
  };

  let completeTask = (taskIndex) => {
    let newTasks = [...tasks];
    newTasks[taskIndex].completed = true;
    setTasks(newTasks);
  };

  let iterateNumberOfPomodorosForSelectedTask = () => {
    if (!selectedTaskIndex || selectedTaskIndex >= tasks.length) return;

    let newTasks = [...tasks];
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
      }}>
      <div className="App">
        <header className="App-header">
          <Timer />
          <Tasks />
          <TimeEstimation />
        </header>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
