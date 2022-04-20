import { useState } from "react";
import type { Task } from "../types/Task";

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
      <div className={`bg-gray-100 rounded text-lg text-gray-900`}>
        <div className="px-2 py-2 text-left">
          <input
            className="w-full pl-2 py-1 text-lg border border-gray-300 rounded"
            placeholder="What are you working on?"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}></input>
          <p className="font-semibold text-base mt-2">Est Pomodoros</p>
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
              className="w-12 rounded border border-gray-300 pl-2 text-center"
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
              className="underline text-gray-500 text-sm">
              + Add Note
            </button>
          )}
        </div>
        <div className="bg-gray-300 rounded-b px-2 py-2">
          <div className="flex justify-end text-base gap-2">
            <button
              className=" bg-gray 300 rounded px-3 py-1"
              onClick={() => setButtonState(ButtonState.BUTTON)}>
              Cancel
            </button>
            <button
              className="bg-gray-600 text-white rounded px-3 py-1"
              onClick={() => {
                onClick({
                  title: taskName,
                  selected: false,
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
      className={`w-full text-gray-200 border-2 border-dashed text-center text-lg px-4 py-1 rounded cursor-pointer`}
      onClick={() => setButtonState(ButtonState.ADDING)}>
      Add Task
    </button>
  );
};

export default AddTaskButton;
