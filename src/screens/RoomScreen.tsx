import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import ConnectedUsers from "../components/ConnectedUsers";
import NewUserNotification from "../components/notifications/NewUserNotification";
import ProgressSection from "../components/ProgressSection";
import TimeEstimation from "../components/TimeEstimation";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import Tasks from "../components/Tasks";
import { RoomContext } from "../context/RoomContext";
import { AuthContext } from "../context/AuthContext";
import Chat from "../components/Chat";
import UserVideos from "../components/UserVideos";

const RoomScreen = () => {
  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);
  const { tasks } = useContext(TasksContext);
  const { socket } = useContext(RoomContext);

  const { connectedUsers } = useContext(RoomContext);
  const { user, isLoggedIn } = useContext(AuthContext);

  const { roomCode } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !roomCode || !user) return;
    console.log(user.displayName);
    socket.emit(
      "join-room",
      { roomCode, displayName: user.displayName, databaseId: user._id },
      (roomExists: boolean) => {
        if (!roomExists) navigate("/");
      }
    );
  }, [roomCode, user]);

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

  return (
    <div className="flex gap-2 max-w-7xl m-auto px-3">
      <div className="flex flex-shrink-0 gap-2 flex-col w-[18rem]">
        {/* {newUserEffectOn && <NewUserNotification />} */}
        {/* <Chat /> */}
        <Timer socket={socket} />
        <ProgressSection />
        <ConnectedUsers connectedUsers={connectedUsers} />
      </div>
      <div className="flex gap-2 flex-col ">
        <Tasks />
      </div>
      <div className="flex gap-2 flex-col">
        <UserVideos />
      </div>
    </div>
  );
};

export default RoomScreen;
