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

let TaskList = () => {
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
    return (
      <TaskBox
        task={task}
        onClick={() => selectTask(i)}
        onDelete={() => deleteTask(i)}
      />
    );
  });

  return (
    <div>
      <p className="text-base font-semibold my-6">
        Working on:{" "}
        {selectedTaskIndex < tasks.length && tasks[selectedTaskIndex].title}
      </p>
      <div className="w-96 flex gap-1.5 mt-2 flex-col">
        {listTasks}
        <AddTaskButton onClick={(t) => addTask(t)} />
      </div>
    </div>
  );
};

export default TaskList;
