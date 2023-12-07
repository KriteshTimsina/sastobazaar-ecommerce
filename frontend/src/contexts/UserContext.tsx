import React,{createContext,useContext, useEffect, useState} from 'react'


const UserContext = createContext<any>(null)

const UserProvider = ({children}:any) => {

const [user,setUser] = useState("")

const saveUserToken = (token:string)=>{
    setUser(token);
    localStorage.setItem("user",token)
}

  return <UserContext.Provider value={{user,setUser,saveUserToken}}>
    {children}
  </UserContext.Provider>
}

export default UserProvider

export const useUser = ():{
    user:string;
    setUser:any;
    saveUserToken:any;
}=>{
    return useContext(UserContext)
}