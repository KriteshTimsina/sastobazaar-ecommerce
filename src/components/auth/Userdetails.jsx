import React from "react";
import { CgProfile } from "react-icons/cg";
const Userdetails = ({ toggleProfile, user, logout, showUserDetails }) => {
  return (
    <div className="text-white">
      <CgProfile
        cursor={"pointer"}
        size={20}
        onClick={showUserDetails}
        title={user.email}
      />
      {toggleProfile && (
        <div className="user--details">
          <p>ACCOUNT</p>
          <div className="user">
            <img src={user.picture} alt={user.name} />
            <div>
              <p>Namaskar,&nbsp;{user.given_name}</p>
              <p className="email">{user.email.slice(0, 20)}...</p>
            </div>
          </div>
          <p>PROFILE</p>
          <div className="profiles">
            <p>Activity</p>
            <p>Settings</p>
            <p>Help</p>
            <input
              type="button"
              value="Logout"
              className="cta-auth"
              onClick={() => logout({ returnTo: window.location.origin })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Userdetails;
