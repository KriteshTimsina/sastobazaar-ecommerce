import { createContext, useContext, useEffect, useState } from "react";
import { IUserCredentials, UserContextType } from "../constants/types";

const UserContext = createContext<UserContextType | any>(undefined);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUserCredentials>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  const saveUserToken = (userInfo: IUserCredentials) => {
    if (userInfo) {
      console.log(userInfo,"THIS???")
      localStorage.setItem(
        "user",
        JSON.stringify({ token: userInfo.token, userId: userInfo.userId })
      );
      setUser(userInfo);
    }
  };

  return ( <UserContext.Provider value={{ user, saveUserToken }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = (): {
  user: IUserCredentials;
  saveUserToken: (user: IUserCredentials) => void;
} => useContext(UserContext);

export default UserProvider;