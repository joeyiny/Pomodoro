import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomContext, TasksContext, User } from "../App";
import ConnectedUsers from "../components/ConnectedUsers";
import NewUserNotification from "../components/notifications/NewUserNotification";
import ProgressSection from "../components/ProgressSection";
import TimeEstimation from "../components/TimeEstimation";
import Timer from "../components/Timer";
import { SocketContext } from "../types/GlobalContext";

const RoomScreen = () => {
  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);
  const { tasks, setCompletedPomodoros, completedPomodoros } =
    useContext(TasksContext);
  const { socket } = useContext(SocketContext);

  const { connectedUsers } = useContext(RoomContext);

  const { roomCode } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

  return (
    <div>
      {newUserEffectOn && <NewUserNotification />}
      <div className="text-center bg-gray-800 min-h-screen">
        <div className="App-header text-white  flex gap-2 flex-col w-96 m-auto py-10">
          <p>Room Code: {roomCode}</p>
          <ConnectedUsers connectedUsers={connectedUsers} />
          <ProgressSection />
          <Timer socket={socket} />
          {/* <Tasks /> */}
          {tasks.length > 0 && <TimeEstimation />}
        </div>
      </div>
    </div>
  );
};

export default RoomScreen;
