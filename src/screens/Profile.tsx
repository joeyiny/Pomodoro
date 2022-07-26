import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { email } = useParams();
  const [user, setUser] = useState<any>({});
  const [completedPomodoros, setCompletedPomodoros] = useState<
    Array<{ date: string | number | Date }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let fetchUser = async () => {
      let response = await fetch(`http://localhost:3000/user/${email}`);
      let user = await response.json();
      setUser(user);
      setIsLoading(false);
      if (user.completedPomodoros?.length > 0) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let oneWeekAgo = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 6
        );
        let newPomos = user.completedPomodoros.filter(
          (pomo: { date: string | number | Date }) => {
            let pomoDate = new Date(pomo.date);
            return pomoDate >= oneWeekAgo;
          }
        );
        setCompletedPomodoros(newPomos);
      }
    };
    fetchUser();
  }, [email]);

  let displayPomodoroCalendar = () => {
    let today = new Date();
    let output = [];
    for (let i = 6; i >= 0; i--) {
      let date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      let currentPomoList = completedPomodoros.filter((pomo) => {
        let pomoDate = new Date(pomo.date);
        pomoDate.setHours(0, 0, 0, 0);
        return pomoDate.getTime() === date.getTime();
      });
      let numberOfPomos = currentPomoList.length;
      output.push(
        <div className="flex-1 h-full">
          {i === 0 ? (
            <span className="font-semibold text-gray-50">Today</span>
          ) : (
            <span className="text-gray-400">
              {date.toLocaleDateString("en-us", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}

          <div className="flex justify-center flex-col align-middle border border-gray-500 rounded-lg w-full h-full">
            {numberOfPomos > 0 ? (
              <span className="text-primary text-3xl font-semibold">
                {numberOfPomos}
              </span>
            ) : (
              <span className="text-gray-500 text-3xl font-semibold">0</span>
            )}
          </div>
        </div>
      );
    }
    return output;
  };

  if (isLoading) return <div>loading</div>;
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-gray-50">{user.displayName}</h3>
      <div className="flex flex-col gap-2">
        <p>
          Past 7 days:{" "}
          <span className="text-primary font-semibold">
            {completedPomodoros.length} pomos
          </span>
          .
        </p>
        <div className="flex flex-row gap-2 justify-between w-[464px] h-14 m-auto">
          {displayPomodoroCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
