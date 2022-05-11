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

const RoomScreen = () => {
  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);
  const { tasks } = useContext(TasksContext);
  const { socket } = useContext(RoomContext);

  const { connectedUsers } = useContext(RoomContext);
  const { displayName, isLoggedIn, setDisplayName } = useContext(AuthContext);
  const [userNameInput, setUserNameInput] = useState<string>("");

  const { roomCode } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !roomCode || !displayName) return;
    socket.emit(
      "join-room",
      { roomCode, userName: displayName },
      (roomExists: boolean) => {
        if (!roomExists) navigate("/");
      }
    );
  }, [roomCode, displayName]);

  useEffect(() => {
    setTimeout(() => {
      setNewUserEffectOn(false);
    }, 6500);
  }, [newUserEffectOn]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetch("http://localhost:3000/isUserAuth", {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isLoggedIn) {
          navigate("/login", { replace: true });
        } else {
          setDisplayName(data.displayName);
        }
      });
  }, []);
  return (
    <div className="flex gap-2 flex-col w-96 m-auto py-10">
      {newUserEffectOn && <NewUserNotification />}
      {/* <p>Room Code: {roomCode}</p> */}
      <ConnectedUsers connectedUsers={connectedUsers} />
      <ProgressSection />
      <Timer socket={socket} />
      <Tasks />
      {tasks.length > 0 && <TimeEstimation />}
    </div>
  );
};

export default RoomScreen;
