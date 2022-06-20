import { User } from "../types/User";
import UserVideos from "./UserVideos";

const ConnectedUsers = ({
  connectedUsers,
}: {
  connectedUsers: { [peerId: string]: User };
}) => {
  const users = Object.keys(connectedUsers).map(
    (keyName: string, i: number) => (
      <p className="text-gray-300 font-semibold">
        {connectedUsers[keyName].displayName}
      </p>
    )
  );

  return (
    <div>
      <span className="bg-gray-200 text-gray-400 font-semibold">
        Connected users: {Object.keys(connectedUsers).length}
      </span>
      {users}
    </div>
  );
};

export default ConnectedUsers;
