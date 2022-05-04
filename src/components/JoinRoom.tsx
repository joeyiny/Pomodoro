import React, { useContext, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from "../types/GlobalContext";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";

const JoinRoom = () => {
  const [roomCodeInput, setRoomCodeInput] = useState<string>("");
  const { currentUserName, setCurrentUserName } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);

  const navigate = useNavigate();

  return (
    <div className="text-center bg-gray-800 min-h-screen">
      <div className="App-header text-white flex gap-2 flex-col w-96 m-auto py-10">
        <button
          onClick={() => {
            socket.emit("create-room", currentUserName, (response: string) => {
              navigate("/" + response);
            });
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
    </div>
  );
};

export default JoinRoom;
