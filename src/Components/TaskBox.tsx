import { useState } from "react";
import type { Task } from "../App.tsx";

let TaskBox = ({
  task,
  onClick,
  onDelete,
}: {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
}) => {
  let [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <div
      className={`w-full text-black ${
        task.selected ? "bg-gray-200" : "bg-gray-600"
      } text-lg px-3 py-2 rounded cursor-pointer`}
      onClick={onClick}>
      <div className=" flex gap-2 justify-between">
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
        <span className="flex gap-2 text-sm font-semibold items-center">
          <span>
            {task.pomodorosCompleted ? task.pomodorosCompleted : 0}/
            {task.pomodoroGoal}
          </span>
          <button
            className="border border-gray-900 bg-gray-300 w-6 rounded justify-center text-center align-middle items-center"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24">
              <path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
            </svg>
          </button>
        </span>
      </div>
      {task.note && (
        <span className="text-sm bg-yellow-200 mt-2 p-2 shadow-sm rounded block text-left w-full">
          {task.note}
        </span>
      )}
      {isSettingsOpen ? <button onClick={() => onDelete()}>delete</button> : ""}
    </div>
  );
};

export default TaskBox;
