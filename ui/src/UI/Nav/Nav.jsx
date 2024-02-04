import React from "react";
import GradientButton from "../GradientButton/GradientButton";
import Logo from "./BarterHub.png";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.Nav}>
      <img className={styles.Logo} src={Logo} alt="logo of barter hub" />
      <div className={styles["search-container"]}>
        <input
          className={styles.search}
          type="text"
          placeholder="Type to search"
        ></input>
      </div>
      <ul className={styles.items}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Listing</a>
        </li>
        <li>
          <GradientButton rounded={false} text="Login" />
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
