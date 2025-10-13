import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.header}>
       <Link to="/" className={styles.headerlink}>
          <img src="/Logo_Waschbaer.png" alt="logo" className={styles.logo} />
        </Link>

        <Link to="/posts" className={styles.link}>
          All Posts
        </Link>
        <Link to="/AddNewPost" className={styles.link}>
          Add New Post
        </Link>
      </div>
    </div>
  );
};

export default Header;
