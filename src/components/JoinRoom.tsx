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
    <div className="flex flex-col gap-2 w-[32rem] m-auto">
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
        className="bg-primary text-gray-800 w-max m-auto uppercase font-semibold px-4 py-1 rounded-full">
        Start New Room
      </button>
      <div>
        <p className="">Or join a room:</p>
        <div className="flex-grow flex flex-row gap-1 w-full">
          <input
            className="text-gray-900 px-4 rounded-full flex-grow py-0.5"
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
            className="border-2 border-gray-50 text-gray-50 hover:border-primary hover:text-primary w-max m-auto uppercase font-semibold px-4 py-1 rounded-full">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
