import React, { useEffect, useState } from "react";
import Logo from "../../Assets/Images/BarterHub.png";
import styles from "../../Assets/Stylesheets/UI/Nav.module.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import ConfirmationModal from '../../UI/BootstrapModal/ConfirmationModal';
import { useLocation, useNavigate } from 'react-router-dom';
import logout from '../../utills/logoutUtil'
import { useAuth } from "../../contexts/AuthContext";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const {isLoggedIn,setIsLoggedIn} = useAuth()
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
  if(isLoggedIn){
    console.log(isLoggedIn)
  }
  const handleLogout = async () => {
    setConfirmMessage("Are you sure you want to logout?");
    setConfirmAction(() => () => {
      logout(user,setUser,setModalOpen, toast, navigate)
  });
    setModalOpen(true);
  };

  const isCurrentPage= (url) =>{
    return location.pathname === url
  }
  
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
          <li><a href="/" className={isCurrentPage("/") ? styles.active : ""}>Home</a></li>
          <li><a href="/productListings" className={isCurrentPage("/productListings") ? styles.active : ""}>Listing</a></li>
          
          {isLoggedIn ? 
          (user && (
            <>
              {user.userType === "admin" ? (
                <>
                  {/* Render admin-specific components */}
                  <li>
                    <a href="/admin" className={isCurrentPage("/admin") ? styles.active : ""}>
                      <i className="fa fa-user"></i>
                    </a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className={styles.logout}>
                      <i className="fa fa-sign-out"></i>
                    </button>
                  </li>
                </>
              ) : user.userType === "user" ? (
                <>
                  {/* Render user-specific components */}
                  <li>
                    <a href="/user" className={isCurrentPage("/user") ? styles.active : ""}>
                      <i className="fa fa-user"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/chat" className={isCurrentPage("/chat") ? styles.active : ""}>
                      <i className="fa fa-comment-alt"></i>
                    </a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className={styles.logout}>
                      <i className="fa fa-sign-out"></i>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <a href="/login" className={isCurrentPage("/login") ? styles.active : ""}>
                    <button > login </button>
                  </a>
                </li>
              )}
            </>
          ))
          :
            <li>
              <a href="/login" className={isCurrentPage("/login") ? styles.active : ""}>
                <span>login</span>
              </a>
            </li>
          }
        </ul>
      </nav>
    </>
  );
};

export default Nav;
