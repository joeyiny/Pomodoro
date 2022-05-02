import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomContext, TasksContext } from "../App";
import ConnectedUsers from "../components/ConnectedUsers";
import NewUserNotification from "../components/notifications/NewUserNotification";
import ProgressSection from "../components/ProgressSection";
import TimeEstimation from "../components/TimeEstimation";
import Timer from "../components/Timer";
import { SocketContext } from "../types/GlobalContext";
import { useNavigate } from "react-router-dom";

const RoomScreen = () => {
  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);
  const { tasks, setCompletedPomodoros, completedPomodoros } =
    useContext(TasksContext);
  const { socket } = useContext(SocketContext);

  const { connectedUsers, currentUserName, setCurrentUserName } =
    useContext(RoomContext);
  const [userNameInput, setUserNameInput] = useState<string>("");

  const { roomCode } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!roomCode) return;
    socket.emit(
      "join-room",
      { roomCode, userName: currentUserName },
      (roomExists: boolean) => {
        if (!roomExists) navigate("/");
      }
    );
  }, [roomCode, currentUserName]);

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

  if (!currentUserName)
    return (
      <div className="text-center bg-gray-800 min-h-screen">
        <div className="App-header text-white  flex gap-2 flex-col w-96 m-auto py-10">
          <p>What's your name?</p>
          <form
            className="flex flex-row gap-2"
            onSubmit={() => setCurrentUserName(userNameInput)}>
            <input
              className="text-gray-800 flex-grow"
              type="text"
              value={userNameInput}
              placeholder="Display Name"
              onChange={(e) => setUserNameInput(e.target.value)}
            />
            <button
              type="submit"
              className="border-2 border-white rounded  w-min px-2 py-1">
              Join
            </button>
          </form>
        </div>
      </div>
    );
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
