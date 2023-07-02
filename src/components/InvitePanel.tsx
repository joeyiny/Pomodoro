import React from "react";
import { useParams } from "react-router";
import { AiOutlineCopy } from "react-icons/ai";

const InvitePanel = () => {
  const { roomCode } = useParams();

  return (
    <div className="mt-3 mb-2">
      <span className="text-gray-400 text-sm font-semibold">
        Share this room link to invite a friend:
      </span>
      <div
        className="flex flex-row gap-2 justify-between bg-gray-800 rounded-lg px-4 py-3 items-center text-gray-400 hover:text-gray-50 hover:cursor-pointer select-none"
        onClick={() => {
          navigator.clipboard.writeText(`https://pomo.wtf/${roomCode}`);
        }}>
        <span className="text-sm inline-block text-left font-semibold">
          https://pomo.wtf/{roomCode}
        </span>
        <AiOutlineCopy className="inline-block" size="2em" />
      </div>
    </div>
  );
};

export default InvitePanel;
