import React, { useEffect, useState } from "react";
import GradientButton from "../GradientButton/GradientButton";
import Logo from "./BarterHub.png";
import styles from "./Nav.module.css";

const Nav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); 
    }
  }, []);

  

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
        <li><a href="/">Home</a></li>
        <li><a href="/productListings">Listing</a></li>
        <li>
          {user ? (
            <a href="/user">
              <GradientButton rounded={false} text="User Profile" />
            </a>
          ) : (
            <a href="/login">
              <GradientButton rounded={false} text="Login" />
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
