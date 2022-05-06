import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const ProgressSection = () => {
  const { completedPomodoros } = useContext(TasksContext);

  let bar = "";
  for (let i = 0; i < 8; i++) {
    if (completedPomodoros && i < completedPomodoros) {
      bar += "🟩";
    } else {
      bar += "⬜️";
    }
    bar += " ";
  }

  return (
    <div className=" text-lg flex gap-1 flex-col bg-gray-700 w-96 p-4 rounded-md text-white">
      <p className="text-center">
        Daily Pomodoro Goal: {completedPomodoros} / 8{" "}
        {completedPomodoros >= 8 && "✅"}
      </p>
      {bar}
      {completedPomodoros > 0 && (
        <p className="text-xs">
          You have completed {completedPomodoros * 25} minutes of deep work
          today!
        </p>
      )}
    </div>
  );
};

export default ProgressSection;
