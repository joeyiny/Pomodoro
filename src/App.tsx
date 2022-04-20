import "./App.css";
import Tasks from "./Components/Tasks.tsx";
import Timer from "./Components/Timer.tsx";
import TimeEstimation from "./Components/TimeEstimation.tsx";
import ProgressSection from "./Components/ProgressSection.tsx";

import { createContext, useEffect, useState } from "react";

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
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);

  useEffect(() => {
    const taskData = localStorage.getItem("tasks");
    const selectedTaskIndexData = localStorage.getItem("selectedTaskIndex");
    const completedPomodorosData = localStorage.getItem("completedPomodoros");
    setTasks(JSON.parse(taskData));
    setSelectedTaskIndex(JSON.parse(selectedTaskIndexData));
    setCompletedPomodoros(JSON.parse(completedPomodorosData));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("selectedTaskIndex", selectedTaskIndex);
    localStorage.setItem("completedPomodoros", completedPomodoros);
  });

  const DAILY_POMODORO_GOAL = 8;

  let addTask = (task) => {
    setTasks([...tasks, task]);
    setSelectedTaskIndex(tasks.length);
  };

  let deleteTask = (taskIndex) => {
    let newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);
    setTasks(newTasks);
  };

  let toggleCompleteTask = (taskIndex) => {
    let newTasks = [...tasks];
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
    setTasks(newTasks);
  };

  let iterateNumberOfPomodorosForSelectedTask = () => {
    if (selectedTaskIndex === null || selectedTaskIndex >= tasks.length) return;

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
        toggleCompleteTask,
      }}>
      <div className="App">
        <header className="App-header">
          <ProgressSection />
          <Timer />
          <Tasks />
          {tasks.length > 0 && <TimeEstimation />}
        </header>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
