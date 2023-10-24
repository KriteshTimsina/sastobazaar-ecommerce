import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "../context/ThemeContext";
import { useAuth0 } from "@auth0/auth0-react";
import Userdetails from "./auth/Userdetails";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({
  isNavbarExtended,
  setIsNavbarExtended,
  toggleProfile,
  setToggleProfile,
}) => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const { isDarkTheme, toggleTheme } = useTheme();
  const showUserDetails = () => {
    setToggleProfile(!toggleProfile);
  };

  const toggleHamburgerMenu = () => {
    setIsNavbarExtended(!isNavbarExtended);
  };

  const closeHamburgerMenu = () => {
    if (isNavbarExtended) {
      toggleHamburgerMenu();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-gray-900 border-gray-200 shadow-sm shadow-white">
      <div className="flex flex-wrap items-center justify-start max-w-screen-xl pt-3 pl-0 pb-3 mx-auto md:justify-around">
        <button
          onClick={toggleHamburgerMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="relative inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover-bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <RxHamburgerMenu size={25} />
        </button>
        <Link
          to="/"
          className="flex items-center self-center text-2xl font-semibold text-white uppercase"
          onClick={closeHamburgerMenu} // Close hamburger menu when Home is clicked
        >
          Sasto&nbsp;
          <span className="whitespace-nowrap text-primary"> Bazaar 🛒</span>
        </Link>

        <div className="absolute flex items-center gap-3 right-5">
          <DarkModeSwitch
            checked={isDarkTheme}
            onChange={toggleTheme}
            className="text-yellow-400 dark:text-gray-500"
          />
          {isNavbarExtended && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 flex flex-col items-center justify-center">
              <button
                onClick={toggleHamburgerMenu}
                className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
              >
                &#10006;{/* Close button (X) */}
              </button>
              <div className="flex flex-col items-center gap-2">
                <Link to="/" className="text-white" onClick={closeHamburgerMenu}>
                  Home
                </Link>
                <Link to="/product" className="text-white" onClick={closeHamburgerMenu}>
                  Products
                </Link>
                <Link to="/cart" className="text-white cursor-pointer" onClick={closeHamburgerMenu}>
                  Cart
                </Link>
                <Link to="/wishlist" className="text-white cursor-pointer" onClick={closeHamburgerMenu}>
                  Wishlist
                </Link>
                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      loginWithRedirect();
                      closeHamburgerMenu();
                    }}
                    className="text-white"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="md:hidden">
            {isAuthenticated && (
              <Userdetails
                {...{ user, logout, toggleProfile, showUserDetails }}
              />
            )}
          </div>
        </div>
        <div className="hidden w-full md:block md:w-auto " id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-900 md:dark-bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#3b82f6" : "white",
                })}
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 "
                onClick={closeHamburgerMenu} // Close hamburger menu when Home is clicked
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
                onClick={closeHamburgerMenu} // Close hamburger menu when Products is clicked
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
                className="block py-2 pl-3 pr-4 rounded text-w md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark:text-white md:dark-text-blue-500 dark-bg-gray-700 dark-text-white md:dark-bg-transparent"
                onClick={closeHamburgerMenu} // Close hamburger menu when Cart is clicked
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#3b82f6" : "white",
                })}
                to="/wishlist"
                className="block py-2 pl-3 pr-4 rounded text-w md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark:text-white md:dark-text-blue-500 dark-bg-gray-700 dark-text-white md:dark-bg-transparent"
                onClick={closeHamburgerMenu} // Close hamburger menu when Cart is clicked
              >
                Wishlist
              </NavLink>
            </li>
            <li>
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    loginWithRedirect();
                    closeHamburgerMenu();
                  }}
                  className="text-white cursor-pointer"
                >
                  Login
                </button>
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
