import { useContext } from "react";
import { TasksContext } from "../App";

const ProgressSection = () => {
  const { completedPomodoros } = useContext(TasksContext);

  let bar = "";
  if (completedPomodoros) {
    for (let i = 0; i < 8; i++) {
      if (i < completedPomodoros) {
        bar += "🟩";
      } else {
        bar += "⬜️";
      }
      bar += " ";
    }
  }

  return (
    <div className="absolute top-10 text-lg left-0 right-0 flex gap-1 flex-col">
      <p className="text-center">
        Daily Pomodoro Goal: {completedPomodoros} / 8{" "}
        {completedPomodoros && completedPomodoros >= 8 && "✅"}
      </p>
      {bar}
      {completedPomodoros && completedPomodoros > 0 && (
        <p className="text-xs">
          You have completed {completedPomodoros * 25} minutes of deep work
          today!
        </p>
      )}
    </div>
  );
};

export default ProgressSection;
