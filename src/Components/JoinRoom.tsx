import React, { useContext, useState } from "react";
import { Socket } from "socket.io-client";
import { RoomContext } from "../App";
import { SocketContext } from "../types/GlobalContext";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [roomCodeInput, setRoomCodeInput] = useState<string>("");
  const [userNameInput, setUserNameInput] = useState<string>("");
  const { socket } = useContext(SocketContext);
  const { setRoomCode } = useContext(RoomContext);
  const navigate = useNavigate();

  return (
    <div className="text-center bg-gray-800 min-h-screen">
      <div className="App-header text-white flex gap-2 flex-col w-96 m-auto py-10">
        <p className="">Join a room:</p>
        <input
          className="text-gray-900 flex-grow px-1 py-0.5"
          placeholder="Username"
          type="text"
          value={userNameInput}
          onChange={(e) => setUserNameInput(e.target.value)}
        />
        <div className="flex flex-row gap-x-2">
          <button
            onClick={() => {
              socket.emit("create-room", userNameInput, (response: string) => {
                navigate("/" + response);
                // socket.emit(
                //   "join-room",
                //   {
                //     roomCode: response,
                //     userName: userNameInput,
                //   },
                //   (roomCode: string) => {
                //     setRoomCode(roomCode);
                //   }
                // );
              });
            }}
            className="bg-white text-gray-800 px-2">
            Start New Room
          </button>
          <div className="flex-grow flex flex-row gap-1">
            <input
              className="text-gray-900 px-1 py-0.5"
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
    </div>
  );
};

export default JoinRoom;
