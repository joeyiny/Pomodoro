import { useState, useContext } from "react";
import type { Task } from "../types/Task";
import { TasksContext } from "../context/TasksContext";
import { HiOutlineCheckCircle } from "react-icons/hi";

import { IoSettingsSharp } from "react-icons/io5";
let TaskBox = ({
  task,
  onClick,
  onDelete,
  index,
  selected,
}: {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
  index: number;
  selected: boolean;
}) => {
  let [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  let { toggleCompleteTask } = useContext(TasksContext);
  if (!task) return <p>none</p>;
  return (
    <div
      className={`w-full text-black ${
        selected ? "bg-gray-600" : "bg-gray-700"
      } text-lg px-4 py-3 rounded cursor-pointer`}
      onClick={onClick}>
      <div className=" items-start flex gap-3 justify-between ">
        <span
          className={`flex gap-2 justify-start items-start ${
            task.completed && "line-through"
          }`}>
          <span onClick={() => toggleCompleteTask(index)}>
            <HiOutlineCheckCircle size={36} />
          </span>
          <div className="flex flex-col">
            <span className="text-left text-base font-bold text-gray-50">
              {task.title}
            </span>
            {task.note && (
              <span className="text-sm bg-yellow-200 shadow-sm text-left text-gray-400">
                {task.note}
              </span>
            )}
          </div>
        </span>
        <span className="flex gap-2 text-sm font-semibold items-center ">
          <span>
            {task.pomodorosCompleted ? task.pomodorosCompleted : 0}/
            {task.pomodoroGoal}
          </span>
          {/* <button
            className="border border-gray-900 bg-gray-300 w-6 rounded justify-center text-center align-middle items-center"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            <IoSettingsSharp />
          </button> */}
        </span>
      </div>
      {isSettingsOpen && <button onClick={() => onDelete()}>delete</button>}
    </div>
  );
};

export default TaskBox;
