import { React } from "react";
import { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/imgs/reddit-logo.png";
import searchIcon from "../assets/imgs/search-icon.png";
import {
  signInUser,
  isUserSignedIn,
  signOutUser,
  getUserName,
} from "../scripts/firebase";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(isUserSignedIn);

  const signOut = () => {
    signOutUser();
    setLoggedIn(false);
  };

  const signIn = () => {
    signInUser();
    setLoggedIn(true);
  };

  return (
    <div className="navbar">
      <header className="navbar-container">
        <a className="logo-button" type="button" href="/">
          <div className="logo">
            <img src={logo} alt="Reddit logo" className="logo-img" />
            <p className="logo-text">reddit</p>
          </div>
        </a>
        <div className="search-bar-container">
          <form className="search-form">
            <label htmlFor="search" className="search-label">
              <img className="search-icon" src={searchIcon} alt="Search icon" />
            </label>
            <input
              id="search"
              type="search"
              className="search-bar"
              placeholder="Search Reddit"
            ></input>
          </form>
        </div>
        <div className="login-container">
          {loggedIn ? (
            <button onClick={signOut} type="button" className="login-button">
              Log Out
            </button>
          ) : (
            <button onClick={signIn} type="button" className="login-button">
              Log In
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
