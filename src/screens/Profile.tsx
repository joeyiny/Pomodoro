import React, { useEffect, useState } from "react";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
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
        if (data.isLoggedIn) {
          console.log(data.displayName);
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
