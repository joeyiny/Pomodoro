import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import Card from "./Card";

const ProgressSection = () => {
  const { completedPomodorosToday: completedPomodoros } =
    useContext(TasksContext);

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
    <Card>
      <p className="text-center uppercase text-gray-400 text-sm font-extrabold">
        Daily Pomodoro Goal:{" "}
        <span className="text-primary">{completedPomodoros}/8</span>{" "}
        {completedPomodoros >= 8 && "✅"}
      </p>
      {bar}
      {/* {completedPomodoros > 0 && (
        <p className="text-xs">
          You have completed {completedPomodoros * 25} minutes of deep work
          today!
        </p>
      )} */}
    </Card>
  );
};

export default ProgressSection;
