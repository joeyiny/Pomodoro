import React, { useContext } from "react";
import ProgressSection from "../components/ProgressSection";
import Tasks from "../components/Tasks";
import Timer from "../components/Timer";
import { RoomContext } from "../context/RoomContext";

const SoloPomo = () => {
  const { socket } = useContext(RoomContext);

  return (
    <div className="max-w-7xl m-auto">
      <div className="flex flex-shrink-0 gap-2 flex-col w-[22rem] m-auto">
        {/* {newUserEffectOn && <NewUserNotification />} */}
        {/* <Chat /> */}
        <Timer socket={socket} />
        {/* <ProgressSection /> */}
      </div>
      {/* <div className="flex gap-2 flex-col flex-auto">
			<Tasks />
		</div> */}
    </div>
  );
};

export default SoloPomo;
