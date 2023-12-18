export type IUserCredentials = {
    token:string,
    userId:string
  }

export type UserContextType = {
    user: IUserCredentials;
    saveUserToken:()=>void
  };

  export type IUser = {
    _id:string,
    username:string,
    email:string,
    avatar:string
  }