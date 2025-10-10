import React from 'react';
import styles from './Home.module.css';
const Home = () => {
  return (
    <div className={styles.home}>
        <div className={styles.container}>
            <h1 className={styles.title}>Home</h1>
            <p className={styles.description}>Welcome to the home page</p>
            <button className={styles.button}>Read More</button>
        </div>
    </div>  
  );
};

export default Home;