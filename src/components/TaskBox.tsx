import { useState, useContext } from "react";
import type { Task } from "../types/Task";
import { TasksContext } from "../context/TasksContext";

import { IoSettingsSharp } from "react-icons/io5";
let TaskBox = ({
  task,
  onClick,
  onDelete,
  index,
}: {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
  index: number;
}) => {
  let [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  let { toggleCompleteTask } = useContext(TasksContext);
  if (!task) return <p>none</p>;
  return (
    <div
      className={`w-full text-black ${
        false ? "bg-gray-200" : "bg-gray-700"
      } text-lg px-3 py-2 rounded cursor-pointer`}
      onClick={onClick}>
      <div className=" flex gap-2 justify-between">
        <span
          className={`flex gap-2 justify-start items-center ${
            task.completed && "line-through"
          }`}>
          <span onClick={() => toggleCompleteTask(index)}>
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
          </span>
          <span className="text-base font-semibold">{task.title}</span>
        </span>
        <span className="flex gap-2 text-sm font-semibold items-center">
          <span>
            {task.pomodorosCompleted ? task.pomodorosCompleted : 0}/
            {task.pomodoroGoal}
          </span>
          <button
            className="border border-gray-900 bg-gray-300 w-6 rounded justify-center text-center align-middle items-center"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            <IoSettingsSharp />
          </button>
        </span>
      </div>
      {task.note && (
        <span className="text-sm bg-yellow-200 mt-2 p-2 shadow-sm rounded block text-left w-full">
          {task.note}
        </span>
      )}
      {isSettingsOpen && <button onClick={() => onDelete()}>delete</button>}
    </div>
  );
};

export default TaskBox;
