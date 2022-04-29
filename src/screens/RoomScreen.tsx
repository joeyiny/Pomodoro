import { useParams } from "react-router-dom";

const RoomScreen = () => {
  let params = useParams();
  return <div>{params.roomCode}</div>;
};

export default RoomScreen;
