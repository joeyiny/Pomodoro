import React, { useState } from "react";
import { useParams } from "react-router";
import { AiOutlineCopy } from "react-icons/ai";

const InvitePanel = () => {
  const { roomCode } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    // reset copied indicator after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-3 mb-2 relative">
      {" "}
      {/* make this element relative */}
      <span className="text-gray-400 text-sm font-semibold">
        Share this room code with a friend:
      </span>
      <div
        className="flex flex-row gap-2 justify-between bg-gray-800 rounded-lg px-4 py-3 items-center text-gray-400 hover:text-gray-50 hover:cursor-pointer select-none"
        onClick={() => handleCopy(`${roomCode}`)}>
        <span className="text-sm inline-block text-left font-semibold">
          {roomCode}
        </span>
        <AiOutlineCopy className="inline-block" size="2em" />
      </div>
      {copied && (
        <span
          style={{
            position: "absolute",
            top: "20px",
            right: "0",
            opacity: copied ? "1" : "0",
          }}
          className="bg-green px-2 py-1  text-green-dark rounded transition-opacity">
          Copied to clipboard!
        </span>
      )}
    </div>
  );
};

export default InvitePanel;
