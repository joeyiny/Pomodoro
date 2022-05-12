import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoggedInDisplay = ({
  user,
  setIsLoggedIn,
}: {
  user: any;
  setIsLoggedIn: any;
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  let toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  let logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className=" relative w-auto inline-block text-sm">
      <button
        onClick={toggleDropDown}
        className="bg-gray-600 p-1 px-2 block rounded-sm text-gray-200">
        {user.displayName}
      </button>
      {isDropDownOpen && (
        <button
          onClick={logout}
          className="bg-gray-200 w-full text-gray-800 rounded absolute block h-auto">
          logout
        </button>
      )}
    </div>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login", { replace: true })}
      className="bg-gray-600 p-1 px-2 rounded-sm text-sm text-gray-200">
      Login
    </button>
  );
};

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
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
      });
  }, []);

  return (
    <header className="border-b border-gray-700 h-12 flex flex-row justify-between px-16 items-center">
      <h1 className="font-bold">Pomo.wtf</h1>
      <div>
        {isLoggedIn ? (
          <LoggedInDisplay user={user} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
