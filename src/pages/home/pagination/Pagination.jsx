import React from "react";
import styles from "./Pagination.module.scss";




// Context
import { usePoster } from "../../../context/Context.jsx";



export default function TestComponent() {
    const { 
        page, 
        limit,
        setLimit,  
        goFirstPage, 
        goNextPage, 
        goLastPage, 
        goPreviousPage,
      } = usePoster();

      


  return (
    
    <div className={styles.simpleWrapper}>


        {/* --------- Pagination Container --------- */}
        <div className={styles.paginationContainer}>
          <button className={styles.button} onClick={goFirstPage}>
            First Page
          </button>
          <button className={styles.button} onClick={goPreviousPage}>
            Previous Page
          </button>
          <button className={styles.button}>Current Page: {page}</button>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
          <div className={styles.dropdownContent}>
            <button className={styles.button} onClick={() => setLimit(10)}>
              10
            </button>
            <button className={styles.button} onClick={() => setLimit(20)}>
              20
            </button>
            <button className={styles.button} onClick={() => setLimit(30)}>
              30
            </button>
            <button className={styles.button} onClick={() => setLimit(40)}>
              40
            </button>
            <button className={styles.button} onClick={() => setLimit(50)}>
              50
            </button>
          </div>
          <button className={styles.button} onClick={goNextPage}>
            Next Page
          </button>
          <button className={styles.button} onClick={goLastPage}>
            Last Page
          </button>
        </div>
        </div>
  );
}