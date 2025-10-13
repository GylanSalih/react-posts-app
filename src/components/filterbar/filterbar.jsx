import react, { useState } from "react";
import styles from "./filterbar.module.scss";

const Filterbar = ({ sortByUserId }) => {
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);




  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setFilteredPosts(e.target.value);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredPosts([]);
  };

  const handleSelect = (e) => {
    setFilteredPosts(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.filterbar}>
        <p>Filter</p>
        <input type="text" value={search} onChange={handleSearch} />
        <select className={styles.selectdropdown} onChange={handleSelect}>
            <option onClick={() => {handleClear()}}value="all">Show all</option>
          <option onClick={() => {sortByUserId()}}value="1">User 1</option>
          <option onClick={() => {sortByUserId()}}value="2">User 2</option>
          <option onClick={() => {sortByUserId()}}value="3">User 3</option>
          <option onClick={() => {sortByUserId()}}value="4">User 4</option>
          <option onClick={() => {sortByUserId()}}value="5">User 5</option>
        </select>
        <button className={styles.filterbutton} onClick={handleFilter}>Filter</button>
        <button className={styles.clearbutton} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Filterbar;
