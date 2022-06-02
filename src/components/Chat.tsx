import { SyntheticEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";

const Chat = () => {
  const { socket, chats } = useContext(RoomContext);
  const { user } = useContext(AuthContext);
  const { roomCode } = useParams();

  const [messageInput, setMessageInput] = useState<string>("");

  let sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    if (messageInput.length <= 0) return;
    socket.emit("chat", { roomCode, user, message: messageInput });
    setMessageInput("");
  };

  const listChats = chats.map((chat) => (
    <p>
      <span className="font-bold">{chat.user.displayName}</span>: {chat.message}
    </p>
  ));

  return (
    <div className="bg-gray-200 text-gray-900 absolute right-0 top-0 h-screen flex flex-col p-2 w-72 text-left justify-end">
      <p>{listChats}</p>
      <form className="w-full flex flex-row gap-1" onSubmit={sendMessage}>
        <input
          className="text w-full h-8 border border-gray-500 rounded px-1"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <input
          className=" bg-blue-500 text-white px-2 rounded"
          type="submit"
          value="Send"
        />
      </form>
    </div>
  );
};

export default Chat;
