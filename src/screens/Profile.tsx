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

  if (isLoading) return <div>loading</div>;
  return (
    <div>
      <h3>{user.displayName}</h3>
      <p>All time completed pomodoros: {user.completedPomodoros.length}</p>
    </div>
  );
};

export default Profile;
