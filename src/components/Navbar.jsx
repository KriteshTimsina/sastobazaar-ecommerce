import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import { cartContext } from "../context/cartContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "../context/ThemeContext";
import { useAuth0 } from "@auth0/auth0-react";
import Userdetails from "./auth/Userdetails";

const Navbar = ({ isNavbarExtended, setIsNavbarExtended }) => {
  const [toggleProfile, setToggleProfile] = useState(false);

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const { cart } = useContext(cartContext);
  const { isDarkTheme, toggleTheme } = useTheme();
  const showUserDetails = () => {
    setToggleProfile(!toggleProfile);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-900 border-gray-200 shadow-sm shadow-white">
      <div className="flex flex-wrap items-center justify-around max-w-screen-xl p-4 mx-auto">
        <Link
          to="/"
          className="flex items-center self-center text-2xl font-semibold text-white uppercase"
        >
          Sasto&nbsp;
          <span className=" whitespace-nowrap text-primary"> Bazaar 🛒</span>
        </Link>

        <button
          onClick={() => setIsNavbarExtended(!isNavbarExtended)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="relative inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <RxHamburgerMenu size={25} />
          {isNavbarExtended && (
            <div
              className="z-10 absolute top-[58px]
           w-[150px] h-[100px] -translate-x-1/2 bg-gray-900 flex flex-col"
            >
              <Link
                to="/"
                className="p-1 my-2 hover:text-blue-500 hover:bg-slate-200"
              >
                Home
              </Link>
              <Link
                to="/product"
                className="p-1 my-2 hover:text-blue-500 hover:bg-slate-200"
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="p-1 my-2 hover:text-blue-500 hover:bg-slate-200"
              >
                Cart ({cart.length})
              </Link>
            </div>
          )}
        </button>
        <DarkModeSwitch
          checked={isDarkTheme}
          onChange={toggleTheme}
          className="absolute text-yellow-400 right-5 sm:right-10 dark:text-gray-500"
        />
        <div className="hidden w-full md:block md:w-auto " id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#3b82f6" : "white",
                })}
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 "
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product"
                style={({ isActive }) => ({
                  color: isActive ? "#3b82f6" : "white",
                })}
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 "
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#3b82f6" : "white",
                })}
                to="/cart"
                className="block py-2 pl-3 pr-4 rounded text-w hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Cart
              </NavLink>
            </li>
            <li>
              {!isAuthenticated ? (
                <input
                  type="button"
                  value="Login"
                  className="text-white"
                  onClick={() => loginWithRedirect()}
                />
              ) : (
                <Userdetails
                  {...{ user, logout, toggleProfile, showUserDetails }}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
