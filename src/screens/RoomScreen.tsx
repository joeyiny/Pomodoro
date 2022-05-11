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

const RoomScreen = () => {
  const [newUserEffectOn, setNewUserEffectOn] = useState<boolean>(false);
  const { tasks } = useContext(TasksContext);
  const { socket } = useContext(RoomContext);

  const { connectedUsers, currentUserName, setCurrentUserName } =
    useContext(RoomContext);
  const [userNameInput, setUserNameInput] = useState<string>("");

  const { roomCode } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!roomCode || !currentUserName) return;
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
          setCurrentUserName(data.displayName);
        }
      });
  }, []);

  if (!currentUserName)
    return (
      <>
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
      </>
    );
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
