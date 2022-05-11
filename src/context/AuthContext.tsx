import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  displayName: string;
  setDisplayName: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
  displayName: "",
  setDisplayName: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, displayName, setDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
};
