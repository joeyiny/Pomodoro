import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { email } = useParams();
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let fetchUser = async () => {
      let response = await fetch(`http://localhost:3000/user/${email}`);
      let user = await response.json();
      setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, [email]);

  useEffect(() => {
    if (user.completedPomodoros?.length > 0) {
      let newPomos = user.completedPomodoros.filter(
        (pomo: { date: string | number | Date }) => {
          let pomoDate = new Date(pomo.date);
          let randomDate = new Date("2022-06-08");
          return pomoDate <= randomDate;
        }
      );
      console.log(newPomos);
      console.log(new Date());
    }
  }, [user]);

  let displayPomodoros = () => {
    return <p>hi</p>;
  };

  if (isLoading) return <div>loading</div>;
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-gray-50">{user.displayName}</h3>
      {/* <p>All time completed pomodoros: {user.completedPomodoros.length}</p> */}
      {/* {displayPomodoros()} */}
      <div className="flex flex-col gap-2">
        <p>
          Past 7 days:{" "}
          <span className="text-primary font-semibold">18 pomos</span>.
        </p>
        <div className="flex flex-row gap-2 justify-between  w-[464px] h-14 m-auto">
          <div className="flex-1 h-full">
            <span className="text-gray-400">Jul 20</span>
            <div className="flex justify-center flex-col align-middle border border-gray-500 rounded-lg w-full h-full">
              <span className="text-gray-500 text-3xl font-semibold">0</span>
            </div>
          </div>
          <div className="flex-1 h-full">
            <span className="text-gray-400">Jul 21</span>
            <div className="flex justify-center flex-col align-middle border border-gray-500 rounded-lg w-full h-full">
              <span className="text-primary text-3xl font-semibold">3</span>
            </div>
          </div>
          <div className="flex-1 h-full">
            <span className="text-gray-400">Jul 22</span>
            <div className="flex justify-center flex-col align-middle border border-gray-500 rounded-lg w-full h-full">
              <span className="text-primary text-3xl font-semibold">6</span>
            </div>
          </div>
          <div className="flex-1 h-full">
            <span className="text-gray-400">Jul 23</span>
            <div className="flex justify-center flex-col align-middle border border-gray-500 rounded-lg w-full h-full">
              <span className="text-primary text-3xl font-semibold">3</span>
            </div>
          </div>
          <div className="flex-1 h-full">
            <span className="text-gray-400">Jul 24</span>
            <div className="flex justify-center flex-col align-middle border border-gray-500 rounded-lg w-full h-full">
              <span className="text-gray-500 text-3xl font-semibold">0</span>
            </div>
          </div>
          <div className="flex-1 h-full">
            <span className="text-gray-400">Jul 25</span>
            <div className="flex justify-center flex-col align-middle border border-gray-500 rounded-lg w-full h-full">
              <span className="text-primary text-3xl font-semibold">4</span>
            </div>
          </div>
          <div className="flex-1 h-full">
            <span className="font-semibold text-gray-50">Today</span>
            <div className="flex justify-center flex-col align-middle border border-gray-50 rounded-lg w-full h-full">
              <span className="text-primary text-3xl font-semibold">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
