import type { Task } from "./TaskList";

let TaskBox = ({ task, onClick }: { task: Task; onClick: () => void }) => {
  return (
    <div
      className={`w-full text-black ${
        task.selected ? "bg-gray-200" : "bg-gray-600"
      } text-lg px-3 py-1 rounded flex gap-2 justify-between cursor-pointer`}
      onClick={onClick}>
      <span
        className={`flex gap-2 justify-start items-center ${
          task.completed && "line-through"
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24">
          <path
            fill={"bg-red-400"}
            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"
          />
        </svg>
        <span className="text-base font-semibold">{task.title}</span>
      </span>
      <span>
        {task.pomodorosCompleted ? task.pomodorosCompleted : 0}/
        {task.pomodoroGoal}
      </span>
    </div>
  );
};

export default TaskBox;
