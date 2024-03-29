import { useState } from "react";
import type { Task } from "../types/Task";
import { MdAddCircleOutline } from "react-icons/md";

enum ButtonState {
  BUTTON = "button",
  ADDING = "Adding",
}

let AddTaskButton = ({ onClick }: { onClick: (task: Task) => void }) => {
  let [buttonState, setButtonState] = useState<ButtonState>(ButtonState.BUTTON);

  let [taskName, setTaskName] = useState<string>("");
  let [note, setNote] = useState<string>("");
  let [estimatedPomodoros, setEstimatedPomodoros] = useState<number>(1);

  let [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);

  if (buttonState === ButtonState.ADDING)
    return (
      <div className={`bg-gray-600 rounded-lg text-lg text-gray-50`}>
        <div className="px-3 py-3 text-left">
          <input
            className="w-full pl-2 py-1 text-lg rounded text-gray-800"
            placeholder="What are you working on?"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}></input>
          <p className="font-semibold text-base mt-2">Estimated Pomodoros</p>
          <p className="text-sm -mt-1 mb-1">How long will this take you?</p>
          <div className="flex gap-2 justify-start">
            <button
              onClick={() => setEstimatedPomodoros(estimatedPomodoros - 1)}>
              -
            </button>
            <input
              type="number"
              name="estimatedNumberOfPomodoros"
              id="EstimatedNumberOfPomodoros"
              className="w-12 rounded border border-gray-300 pl-2 text-center text-gray-800"
              value={estimatedPomodoros}
              onChange={(e) => setEstimatedPomodoros(e.target.valueAsNumber)}
            />

            <button
              onClick={() => setEstimatedPomodoros(estimatedPomodoros + 1)}>
              +
            </button>
          </div>
          {isEditingNotes ? (
            <textarea
              placeholder="Some notes..."
              className="w-full rounded mt-2 px-2 py-1 text-sm border-gray-300 border resize-y "
              value={note}
              onChange={(e) => setNote(e.target.value)}></textarea>
          ) : (
            <button
              onClick={() => setIsEditingNotes(!isEditingNotes)}
              className="underline text-gray-200 text-sm">
              + Add Note
            </button>
          )}
        </div>
        <div className="rounded-b px-2 py-2">
          <div className="flex justify-end text-base gap-2">
            <button
              className="text-gray-50 uppercase font-bold text-sm rounded px-3 py-1"
              onClick={() => setButtonState(ButtonState.BUTTON)}>
              Cancel
            </button>
            <button
              className="bg-primary text-gray-900 uppercase font-bold text-sm rounded-full px-4 py-1"
              onClick={() => {
                onClick({
                  title: taskName,
                  pomodorosCompleted: undefined,
                  pomodoroGoal: estimatedPomodoros,
                  completed: false,
                  note: note,
                });
                setButtonState(ButtonState.BUTTON);
              }}>
              Save
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <button
      className={`text-gray-500 font-medium hover:text-gray-300 flex flex-row gap-1 items-center m-auto`}
      onClick={() => setButtonState(ButtonState.ADDING)}>
      <MdAddCircleOutline size={21} />
      <span>Add Task</span>
    </button>
  );
};

export default AddTaskButton;
