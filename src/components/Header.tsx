import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu } from "@headlessui/react";
import * as Avatar from "@radix-ui/react-avatar";

const LoggedInDisplay = ({ user }: { user: any }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  let toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Menu as="div" className="relative w-auto inline-block text-sm z-50">
      <Menu.Button
        onClick={toggleDropDown}
        className="flex flex-row gap-3 items-center text-gray-50 text-sm uppercase font-extrabold">
        <span>{user.displayName}</span>
        {/* <img
          src="https://img.seadn.io/files/fd71e2ed1844c918b06350cf9fca922e.png?fit=max&w=600"
          className="rounded-full w-8 h-8"
          alt="pfp"
        /> */}
        <Avatar.Root className=" inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            src="https://img.seadn.io/files/fd71e2ed1844c918b06350cf9fca922e.png?fit=max&w=60"
            className="rounded-full w-8 h-8"
          />

          <Avatar.Fallback
            className="leading-1 flex h-full w-full items-center justify-center bg-[#fff] text-[#000] text-[15px] font-medium"
            delayMs={600}>
            {user.displayName.slice(0, 1)}
          </Avatar.Fallback>
        </Avatar.Root>
      </Menu.Button>
      <Menu.Items className="absolute mt-2 divide-y divide-gray-500 rounded-md bg-white focus:outline-none border-gray-500 bg-opacity-90 border bg-gray-800">
        <Menu.Item
          as="div"
          className="group flex w-full items-center px-1 py-1 text-sm">
          {({ active }) => (
            <Link
              to={`/profile/${user.email}`}
              className={`${
                active ? "bg-primary text-gray-50" : ""
              } group flex w-full items-center font-semibold rounded-md px-1 py-1 text-sm`}>
              Profile
            </Link>
          )}
        </Menu.Item>
        <Menu.Item
          as="div"
          className="group flex w-full items-center px-1 py-1 text-sm">
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`${
                active ? "bg-primary text-gray-50" : ""
              } group flex w-full items-center font-semibold rounded-md px-1 py-1 text-sm`}>
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login", { replace: true })}
      className="bg-gray-300 text-gray-700 p-1 px-2 rounded-sm text-sm text-gray-200 font-semibold hover:bg-gray-100 active:bg-gray-400">
      Login
    </button>
  );
};

const Header = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <header className="h-14 flex flex-row justify-between px-16 items-center">
      <Link to="/">
        <div className="flex gap-2 items-center">
          <span className=" text-lg">🍅</span>
          <h1 className="font-bold text-gray-50">Pomo.wtf</h1>
        </div>
      </Link>
      <div>
        {isLoggedIn ? <LoggedInDisplay user={user} /> : <LoginButton />}
      </div>
    </header>
  );
};

export default Header;
