import { useContext } from "react";
import TaskBox from "./TaskBox";
import AddTaskButton from "./AddTaskButton";
import { TasksContext } from "../context/TasksContext";
import Card from "./Card";

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
    <Card>
      <h3 className="font-bold text-2xl text-gray-50 text-left">Tasks</h3>
      <p className="text-base text-left text-gray-500">
        {selectedTaskIndex !== null &&
          selectedTaskIndex < tasks.length &&
          tasks[selectedTaskIndex].title !== undefined &&
          "Current task: " + tasks[selectedTaskIndex].title}
      </p>
      <div className="flex gap-3 mt-2 flex-col">
        <div className="gap-1.5 flex flex-col">
          {tasks.length > 0 && listTasks}
        </div>
        <AddTaskButton onClick={(t) => addTask(t)} />
      </div>
    </Card>
  );
};

export default Tasks;
