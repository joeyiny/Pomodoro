import { useEffect, useState, useContext } from "react";
import TaskBox from "./TaskBox.tsx";
import AddTaskButton from "./AddTaskButton.tsx";
import { TasksContext } from "../App.tsx";
import { Task } from "../App.tsx";

let TaskList = () => {
  const {
    tasks,
    setTasks,
    selectTask,
    addTask,
    deleteTask,
    selectedTaskIndex,
  } = useContext(TasksContext);

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

  const listTasks = tasks.map((task, i) => {
    return (
      <TaskBox
        task={task}
        onClick={() => selectTask(i)}
        onDelete={() => deleteTask(i)}
        index={i}
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
