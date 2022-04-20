import type { Task } from "./TaskList";

let TaskBox = ({ task, onClick }: { task: Task; onClick: () => void }) => {
  return (
    <div
      className={`w-full text-black ${
        task.selected ? "bg-gray-200" : "bg-gray-600"
      } text-lg px-4 py-1 rounded flex gap-2 justify-between cursor-pointer`}
      onClick={onClick}>
      <span>{task.title}</span>
      <span>
        {task.pomodorosCompleted ? task.pomodorosCompleted : 0}/
        {task.pomodoroGoal}
      </span>
    </div>
  );
};

export default TaskBox;
