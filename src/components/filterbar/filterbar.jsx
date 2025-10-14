import React from "react";
import styles from "./filterbar.module.scss";
import { usePoster } from "../../context/Context.jsx";

const Filterbar = () => {
  const { sortByUserId, setSearchTerm, searchTerm, handleSearch } = usePoster();




  const handleClear = () => {
    setSearchTerm("");
    sortByUserId(""); // Clear filter
  };

  // handle search by string
  // Handle search


  const handleSelect = (e) => {
    const selectedUserId = e.target.value;
    console.log(selectedUserId);
    if (selectedUserId === "all") {
      sortByUserId("");
    } else {
      sortByUserId(selectedUserId);
    }
  };

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
        <select className={styles.selectdropdown} onChange={handleSelect}>
          <option value="all">Show all</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
          <option value="4">User 4</option>
          <option value="5">User 5</option>
        </select>
        <button className={styles.clearbutton} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Filterbar;
