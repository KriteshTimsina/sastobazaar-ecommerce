import React from "react";
import { CgProfile } from "react-icons/cg";
const Userdetails = ({ toggleProfile, user, logout, showUserDetails }) => {
  return (
    <div className="text-white">
      <CgProfile
        size={20}
        onClick={showUserDetails}
        title={user.email}
        className="cursor-pointer"
      />
      {toggleProfile && (
        <div className="flex flex-col items-start gap-4 absolute right-[1%] bg-white text-black dark:bg-darkbg dark:text-darktext h-[300px] p-4 w-[250px] ">
          <p>ACCOUNT</p>
          <div className="flex items-center gap-5 text-sm">
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full"
              width={40}
            />
            <div>
              <p className="">Namaskar,&nbsp;{user.given_name}</p>
              <p className="text-sm text-slate-600">
                {user.email.slice(0, 20)}...
              </p>
            </div>
          </div>
          <p>PROFILE</p>
          <div className="flex flex-col w-full gap-2 cursor-pointer">
            <p className="hover:text-white hover:bg-slate-700">Activity</p>
            <p className="hover:text-white hover:bg-slate-700">Settings</p>
            <p className="hover:text-white hover:bg-slate-700">Help</p>
            <input
              type="button"
              value="Logout"
              className="p-2 text-white bg-black cursor-pointer w-fit"
              onClick={() =>
                logout({ returnTo: "https://sastobazaar.netlify.app" })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Userdetails;
