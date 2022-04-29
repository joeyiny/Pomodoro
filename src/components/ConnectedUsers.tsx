import React from "react";
import { User } from "../App";

const ConnectedUsers = ({
  connectedUsers,
}: {
  connectedUsers: Array<User>;
}) => {
  const listUsers = Object.entries(connectedUsers).map(([key, user], i) => {
    return <li key={i}>{user.userName}</li>;
  });

  return (
    <div className="bg-gray-200 text-gray-900 absolute left-0 top-0 h-screen p-4 flex flex-col gap-2">
      <span className="pb-2 border-gray-300 border-b">
        Connected users: {Object.keys(connectedUsers).length}
      </span>
      <ul className="">{listUsers}</ul>
    </div>
  );
};

export default ConnectedUsers;
