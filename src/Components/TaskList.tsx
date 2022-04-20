import { useEffect, useState } from "react";
import TaskBox from "./TaskBox.tsx";
import AddTaskButton from "./AddTaskButton.tsx";

export type Task = {
  title: string;
  selected: boolean;
  pomodorosCompleted?: number;
  pomodoroGoal: number;
  completed: boolean;
  note?: string;
};

let Tasks = () => {
  let [tasks, setTasks] = useState<Array<Task>>([
    {
      title: "task 1",
      selected: true,
      pomodorosCompleted: 0,
      pomodoroGoal: 2,
      completed: false,
    },
    {
      title: "task 2",
      selected: false,
      pomodorosCompleted: 0,
      pomodoroGoal: 2,
      completed: false,
    },
    {
      title: "task 3",
      selected: false,
      pomodorosCompleted: 0,
      pomodoroGoal: 2,
      completed: false,
    },
  ]);

  let [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(0);

  let addTask = (task) => {
    setTasks([...tasks, task]);
  };

  let iterateNumberOfPomodorosForSelectedTask = () => {
    let newTasks = [...tasks];
    newTasks[selectedTaskIndex].pomodorosCompleted++;
    setTasks(newTasks);
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
      <AddTaskButton onClick={(t) => addTask(t)} />
    </div>
  );
};

export default Tasks;
