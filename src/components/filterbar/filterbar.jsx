import React, { useState } from "react";
import styles from "./filterbar.module.scss";
import { usePoster } from "../../context/Context.jsx";

const Filterbar = () => {
  const { sortByUserId, searchTerm, handleSearch } = usePoster();
  const [selectedUserId, setSelectedUserId] = useState("all");

  console.log(handleSearch);

  const handleSelect = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    console.log(userId);
    if (userId === "all") {
      sortByUserId("");
    } else {
      sortByUserId(userId);
    }
  };

  const resetHandler = () => {
    sortByUserId("");
    setSelectedUserId("all");
  }
  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.filterbar}>
        <p>Filter</p>
        <input 
          placeholder="Search posts..."
          className={styles.input}

          type="text" 
          value={searchTerm} 
          onChange={(e) => handleSearch(e)}
          />
        <select 
          className={styles.selectdropdown} 
          onChange={handleSelect}
          value={selectedUserId}
        >
          <option value="all">Show all</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
          <option value="4">User 4</option>
          <option value="5">User 5</option>
        </select>
        <button className={styles.clearbutton} type="reset" onClick={resetHandler}>Clear</button>
      </div>
    </div>
  );
};

export default Filterbar;
