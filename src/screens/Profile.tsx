import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/isUserAuth", {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);

        if (data.isLoggedIn) {
          setDisplayName(data.displayName);
        }
      });
  }, []);

  return (
    <div>
      Profile
      {displayName && <p>Welcome Back {displayName}!</p>}
    </div>
  );
};

export default Profile;
