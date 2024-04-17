import React from 'react'
import styles from '../../Assets/Stylesheets/UI/Footer.module.css';
const Footer = () => {
    return (
        <footer className='pt-3'>
            <div className={styles.container}>
                <div className={styles.Logo}></div>
                <p className={styles.text}>Your one-stop Marketplace for seamless Transactions</p>
            </div>
            <div className={`${styles.links} text-start`}>
                <h5>Quick Links</h5>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href='/productListings'>Listings</a></li>
                    <li><a href='/login'>Login</a></li>
                    <li><a href='/signup'>Signup</a></li>
                </ul>
            </div>
            <div className={`${styles.links} text-start`}>
                <h5>Social Media</h5>
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