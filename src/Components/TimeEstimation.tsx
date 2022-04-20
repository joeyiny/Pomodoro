import { useState, useContext } from "react";
import { TasksContext } from "../App.tsx";

let TimeEstimation = () => {
  const { tasks, completedPomodoros } = useContext(TasksContext);

  let totalPomodoroGoal = 0;
  if (tasks.length > 0)
    for (let i in tasks) {
      if (!tasks[i].completed) totalPomodoroGoal += tasks[i].pomodoroGoal;
    }

  let estimatedMinutesLeft = (totalPomodoroGoal - completedPomodoros) * 30;

  return (
    <div className=" w-96 mt-4 border-t bg-gray-700 rounded-b p-2 text-lg">
      Estimated: {totalPomodoroGoal} Finished: {completedPomodoros}.{" "}
      {estimatedMinutesLeft > 0 &&
        `You should
      finish in ${estimatedMinutesLeft} minutes.`}
    </div>
  );
};

export default TimeEstimation;
