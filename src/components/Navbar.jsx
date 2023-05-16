import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { cartContext } from "../context/cartContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ isNavbarExtended, setIsNavbarExtended }) => {
  const { cart } = useContext(cartContext);
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <nav className=" z-10 border-gray-200 bg-gray-900 shadow-sm shadow-white fixed left-0 right-0 top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="text-white uppercase self-center text-2xl font-semibold whitespace-nowrap">
            Nest Store
          </span>
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
                className="my-2 p-1 hover:text-blue-500
                  hover:bg-slate-200"
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="my-2 p-1 hover:text-blue-500
                 hover:bg-slate-200"
              >
                Cart ({cart.length})
              </Link>
            </div>
          )}
        </button>
        <DarkModeSwitch
          checked={isDarkTheme}
          onChange={toggleTheme}
          className="absolute right-5 sm:right-10 text-yellow-400 dark:text-gray-500"
        />
        <div className="hidden w-full md:block md:w-auto " id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#3b82f6" : "white",
                })}
                className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent  md:p-0 "
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#3b82f6" : "white",
                })}
                to="/cart"
                className="block py-2 pl-3 pr-4 text-w  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Cart
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
