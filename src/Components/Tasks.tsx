import { useEffect, useContext } from "react";
import TaskBox from "./TaskBox";
import AddTaskButton from "./AddTaskButton";
import { TasksContext } from "../App";

let Tasks = () => {
  const {
    tasks,
    setTasks,
    selectTask,
    addTask,
    deleteTask,
    selectedTaskIndex,
  } = useContext(TasksContext);

  useEffect(() => {
    if (!selectedTaskIndex) return;
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
        key={i}
      />
    );
  });

  return (
    <div>
      <p className="text-base font-semibold my-6">
        Working on:{" "}
        {selectedTaskIndex !== null &&
          selectedTaskIndex < tasks.length &&
          tasks[selectedTaskIndex].title}
      </p>
      <div className="w-96 flex gap-1.5 mt-2 flex-col">
        {tasks.length > 0 && listTasks}
        <AddTaskButton onClick={(t) => addTask(t)} />
      </div>
    </div>
  );
};

export default Tasks;
