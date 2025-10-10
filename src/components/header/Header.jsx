import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
        <div className={styles.linksContainer}>
        <img src="/images/logo.png" alt="logo" className={styles.logo} />
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/AllPosts" className={styles.link}>All Posts</Link>
        <Link to="/AddNewPost" className={styles.link}>Add New Post</Link>
        </div>
    </div>  
  );
};

export default Header;