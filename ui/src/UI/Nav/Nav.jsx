import React, { useEffect, useState } from "react";
import GradientButton from "../GradientButton/GradientButton";
import Logo from "../../Assets/Images/BarterHub.png";
import styles from "../../Assets/Stylesheets/UI/Nav.module.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import ConfirmationModal from '../../UI/BootstrapModal/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      // Decode token and set user data
      const decoded = jwtDecode(token);
      setUser({
        ...decoded,
        token // Store the token if needed for further requests
      });
    }
  }, []);

  const handleLogout = async () => {
    setConfirmMessage("Are you sure you want to logout?");
    setConfirmAction(() => () => {
      fetch('http://localhost:8000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Logout failed!');
          }
        })
        .then(data => {
          if (data.clearToken) {
            setUser(null);
            localStorage.removeItem('token');
            toast.success(data.message);
            setModalOpen(false);
            navigate('/')
          } else {
            throw new Error('Logout failed!');
          }
        })
        .catch(error => {
          console.error("Error during logout:", error);
          toast.error('Logout failed!');
          setModalOpen(false);
        });
    });
    setModalOpen(true);
  };
  return (
    <>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        message={confirmMessage}
      />
      <nav className={styles.Nav}>
        <img className={styles.Logo} src={Logo} alt="logo of barter hub" />
        <div className={styles["search-container"]}>
          <input
            className={styles.searchBox}
            type="text"
            placeholder="Type to search"
          ></input>
          <button className={styles.searchButton}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <ul className={styles.items}>
          <li><a href="/">Home</a></li>
          <li><a href="/productListings">Listing</a></li>
          {/* Default: Render login */}
          {user && (
            <>
              {user.userType === "admin" ? (
                <>
                  {/* Render admin-specific components */}
                  <li>
                    <a href="/admin">
                      Admin Panel
                    </a>
                  </li>
                  <li>
                    <GradientButton rounded={true} text="Logout" onClick={handleLogout} />
                  </li>
                </>
              ) : user.userType === "user" ? (
                <>
                  {/* Render user-specific components */}
                  <li>
                    <a href="/user">
                      User Profile
                    </a>
                  </li>
                  <li>
                    <GradientButton rounded={true} text="Logout" onClick={handleLogout} />
                  </li>
                </>
              ) : (
                <li>
                  <a href="/login">
                    <GradientButton rounded={true} text="Login" />
                  </a>
                </li>
              )}
            </>
          )}
          {!user && ( /* Render login if user is not defined */
            <li>
              <a href="/login">
                <GradientButton rounded={true} text="Login" />
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
