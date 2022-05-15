import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";

const JoinRoom = () => {
  const [roomCodeInput, setRoomCodeInput] = useState<string>("");
  const { user, isLoggedIn } = useContext(AuthContext);
  const { socket } = useContext(RoomContext);

  const navigate = useNavigate();

  if (!user || !isLoggedIn) return <p>error, pls login</p>;
  return (
    <div>
      <button
        onClick={() => {
          socket.emit(
            "create-room",
            user.displayName,
            user._id,
            (response: string) => {
              navigate("/" + response, { replace: true });
            }
          );
        }}
        className="bg-white text-gray-800 w-max m-auto px-2">
        Start New Room
      </button>
      <p className="">Or join a room:</p>
      <div className="flex-grow flex flex-row gap-1 w-full">
        <input
          className="text-gray-900 px-1 flex-grow py-0.5"
          placeholder="Enter room code"
          type="text"
          value={roomCodeInput}
          onChange={(e) => setRoomCodeInput(e.target.value)}
        />
        <button
          onClick={() => {
            socket.emit(
              "check-if-room-exists",
              roomCodeInput,
              (response: { roomCode: string; exists: boolean }) => {
                if (response.exists) {
                  navigate("/" + response.roomCode);
                }
              }
            );
          }}
          className="border-2 border-white rounded  w-min px-2 py-1">
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
