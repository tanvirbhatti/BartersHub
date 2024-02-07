import React from 'react'
import styles from './Footer.module.css';
import Logo from '../Nav/BarterHub.png';
const Footer = () => {
    return (
        <footer>
            <div className={styles.container}>
                <img className={styles.Logo} src={Logo} alt="logo of barter hub" />
                <p className={styles.text}>Your one-stop Marketplace for seamless Transactions</p>
            </div>
            <div className={styles.links}>
                <p>Quick Links</p>
                <ul>
                    <li>Home</li>
                    <li>Listings</li>
                    <li>Login</li>
                    <li>Signup</li>
                </ul>
            </div>
            <div className={styles.links}>
                <p>Social Media</p>
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>Reddit</li>
                </ul>
            </div>
        </footer>)
}

export default Footer