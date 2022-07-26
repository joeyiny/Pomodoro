import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu } from "@headlessui/react";

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
    <Menu as="div" className="relative w-auto inline-block text-sm">
      <Menu.Button
        onClick={toggleDropDown}
        className="flex flex-row gap-3 items-center text-gray-50 text-sm uppercase font-extrabold">
        <span>{user.displayName}</span>
        <img
          src="https://img.seadn.io/files/fd71e2ed1844c918b06350cf9fca922e.png?fit=max&w=600"
          className="rounded-full w-8 h-8"
          alt="pfp"
        />
      </Menu.Button>
      <Menu.Items className="absolute mt-2 divide-y divide-gray-500 rounded-md bg-white focus:outline-none">
        <Menu.Item
          as="div"
          className="group flex w-full items-center px-2 py-2 text-sm">
          {({ active }) => (
            <button
              className={`${
                active ? "bg-gray-500" : ""
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
              Profile
            </button>
          )}
        </Menu.Item>
        <Menu.Item
          as="div"
          className="group flex w-full items-center px-2 py-2 text-sm">
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`${
                active ? "bg-gray-500" : ""
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
    // <div className="relative w-auto inline-block text-sm">
    //   <Menu>
    //     <Menu.Button
    //       onClick={toggleDropDown}
    //       className="flex flex-row gap-3 items-center text-gray-50 text-sm uppercase font-extrabold">
    //       <span>{user.displayName}</span>
    //       <img
    //         src="https://img.seadn.io/files/fd71e2ed1844c918b06350cf9fca922e.png?fit=max&w=600"
    //         className="rounded-full w-8 h-8"
    //         alt="pfp"
    //       />
    //     </Menu.Button>
    //     <Menu.Items>
    //       <Menu.Item>hello</Menu.Item>
    //     </Menu.Items>
    //     {/* <button
    //         onClick={handleLogout}
    //         className="bg-gray-50 w-full text-gray-800 rounded absolute block h-auto">
    //         logout
    //       </button> */}
    //   </Menu>
    // </div>
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
      <div className="flex gap-2 items-center">
        <span className=" text-lg">🍅</span>
        <h1 className="font-bold text-gray-50">Pomo.wtf</h1>
      </div>
      <div>
        {isLoggedIn ? <LoggedInDisplay user={user} /> : <LoginButton />}
      </div>
    </header>
  );
};

export default Header;
