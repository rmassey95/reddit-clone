import { React } from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/imgs/reddit-logo.png";

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
