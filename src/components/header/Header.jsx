import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
        <img src="/logo192.png" alt="logo" className={styles.logo} />
        <div className={styles.linksContainer}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/blog" className={styles.link}>Blog</Link>
        </div>
    </div>  
  );
};

export default Header;