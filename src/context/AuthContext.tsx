import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
  user: {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
