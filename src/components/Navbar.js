import { React } from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/imgs/reddit-logo.png";
import searchIcon from "../assets/imgs/search-icon.png";

const Navbar = ({ loggedIn, signOut, signIn }) => {
  return (
    <div className={styles.navbar}>
      <header className={styles.navbarContainer}>
        <a className={styles.logoBtn} type="button" href="/">
          <div className={styles.logoDiv}>
            <img src={logo} alt="Reddit logo" className={styles.logoImg} />
            <p className={styles.logoText}>reddit</p>
          </div>
        </a>
        <div className={styles.searchBarContainer}>
          <form className={styles.searchForm}>
            <label htmlFor="search" className={styles.searchLabel}>
              <img
                className={styles.searchIconImg}
                src={searchIcon}
                alt="Search icon"
              />
            </label>
            <input
              id="search"
              type="search"
              className={styles.searchBar}
              placeholder="Search Reddit"
            ></input>
          </form>
        </div>
        <div>
          {loggedIn ? (
            <button onClick={signOut} type="button" className={styles.loginBtn}>
              Log Out
            </button>
          ) : (
            <button onClick={signIn} type="button" className={styles.loginBtn}>
              Log In
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
