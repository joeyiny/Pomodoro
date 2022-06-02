import { useContext } from "react";
import TaskBox from "./TaskBox";
import AddTaskButton from "./AddTaskButton";
import { TasksContext } from "../context/TasksContext";

let Tasks = () => {
  const { tasks, selectTask, addTask, deleteTask, selectedTaskIndex } =
    useContext(TasksContext);

  const listTasks = tasks.map((task, i) => {
    return (
      <TaskBox
        task={task}
        onClick={() => selectTask(i)}
        onDelete={() => deleteTask(i)}
        index={i}
        key={i}
        selected={i === selectedTaskIndex}
      />
    );
  });

  return (
    <div>
      <p className="text-base font-semibold my-6">
        {selectedTaskIndex !== null &&
          selectedTaskIndex < tasks.length &&
          tasks[selectedTaskIndex].title !== undefined &&
          "Working on: " + tasks[selectedTaskIndex].title}
      </p>
      <div className="w-96 flex gap-1.5 mt-2 flex-col">
        {tasks.length > 0 && listTasks}
        <AddTaskButton onClick={(t) => addTask(t)} />
      </div>
    </div>
  );
};

export default Tasks;
