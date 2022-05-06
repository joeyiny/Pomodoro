import { useState, useContext } from "react";
import { TasksContext } from "../context/TasksContext";

let TimeEstimation = () => {
  const { tasks, completedPomodoros } = useContext(TasksContext);

  let totalPomodoroGoal = 0;
  if (tasks.length > 0)
    for (let i in tasks) {
      if (!tasks[i].completed) totalPomodoroGoal += tasks[i].pomodoroGoal;
    }

  let estimatedMinutesLeft = (totalPomodoroGoal - completedPomodoros) * 30;

  let estimatedTimeLeft = () => {
    if (estimatedMinutesLeft < 60) return `${estimatedMinutesLeft} minutes`;

    let numberOfHours = Math.floor(estimatedMinutesLeft / 60);
    return `${numberOfHours} hours and ${
      estimatedMinutesLeft - numberOfHours * 60
    } minutes`;
  };

  return (
    <div className=" w-96 mt-4 border-t bg-gray-700 rounded-b p-2 text-lg">
      <p>
        Estimated: {totalPomodoroGoal} Finished: {completedPomodoros}.
      </p>
      {estimatedMinutesLeft > 0 && (
        <p>You should finish in {estimatedTimeLeft()}.</p>
      )}
    </div>
  );
};

export default TimeEstimation;
