import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  login?: (credentials: { password: string; email: string }) => Promise<void>;
  logout: () => void;
  register: any;
  isFetching: boolean;
  errorMessage: string;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isFetching: false,
  logout: () => {},
  register: null,
  errorMessage: "",
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setIsFetching(true);
    setErrorMessage("");
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setUser(data.user);
          setIsFetching(false);
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((e) => setErrorMessage(e));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser({});
  };

  const register = async (credentials: {
    displayName: string;
    email: string;
    password: string;
  }) => {
    setErrorMessage("");
    return await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        login,
        logout,
        register,
        isFetching,
        errorMessage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
