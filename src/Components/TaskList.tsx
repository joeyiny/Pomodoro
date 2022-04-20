import { useEffect, useState } from "react";
import TaskBox from "./TaskBox.tsx";

export type Task = {
  title: string;
  selected: boolean;
  pomodorosCompleted?: number;
  pomodoroGoal: number;
};

let Tasks = () => {
  let [tasks, setTasks] = useState<Array<Task>>([
    { title: "task 1", selected: true, pomodoroGoal: 2 },
    { title: "task 2", selected: false, pomodoroGoal: 2 },
    { title: "task 3", selected: false, pomodoroGoal: 2 },
  ]);

  let [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(0);

  let addTask = () => {
    setTasks([
      ...tasks,
      { title: "new task", selected: false, pomodoroGoal: 2 },
    ]);
  };

  useEffect(() => {
    let newTasks = [...tasks];
    for (let i in newTasks) {
      newTasks[i].selected = false;
    }
    newTasks[selectedTaskIndex] = {
      ...newTasks[selectedTaskIndex],
      selected: true,
    };
    setTasks(newTasks);
  }, [selectedTaskIndex]);

  let selectTask = (taskIndex: number) => {
    setSelectedTaskIndex(taskIndex);
  };

  const listTasks = tasks.map((task, i) => {
    return <TaskBox task={task} onClick={() => selectTask(i)} />;
  });

  return (
    <div className="w-80 flex gap-1 mt-2 flex-col">
      {listTasks}
      <button
        className={`w-full text-gray-200 border-2 border-dashed text-center text-lg px-4 py-1 rounded cursor-pointer`}
        onClick={() => addTask()}>
        Add Task
      </button>
    </div>
  );
};

export default Tasks;
