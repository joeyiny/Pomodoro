import React from "react";

const ConnectedUsers = ({ connectedUsers }: { connectedUsers: number }) => {
  return (
    <div className="bg-gray-200 text-gray-900 absolute left-0 top-0 h-screen p-4 flex flex-col gap-2">
      <span className="pb-2 border-gray-300 border-b">
        Connected users: {connectedUsers}
      </span>
      <ul className="">
        <li className="">Joey</li>
        <li>Shaun</li>
        <li>Gil</li>
      </ul>
    </div>
  );
};

export default ConnectedUsers;
