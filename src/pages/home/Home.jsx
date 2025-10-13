import react from "react";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.home}>
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Home;
