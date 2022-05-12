import { User } from "../types/User";
import UserVideos from "./UserVideos";

const ConnectedUsers = ({
  connectedUsers,
}: {
  connectedUsers: { [peerId: string]: User };
}) => {
  return (
    <div className="bg-gray-200 text-gray-900 absolute left-0 top-0 h-screen p-4 flex flex-col gap-2">
      <span className="pb-2 border-gray-300 border-b">
        Connected users: {Object.keys(connectedUsers).length}
      </span>
      <UserVideos />
    </div>
  );
};

export default ConnectedUsers;
