import React from "react";
import styles from "./Posts.module.scss";
import Card from "../../components/card/Card.jsx";
import AddNewPost from "../add-new-post/AddNewPost.jsx";
import { usePoster } from "../../context/postercontext.jsx";
import Filterbar from "../../components/filterbar/filterbar.jsx";

const Posts = () => {
  const { 
    posts, 
    page, 
    limit, 
    setLimit, 
    error, 
    addNewPost, 
    goFirstPage, 
    goNextPage, 
    goLastPage, 
    goPreviousPage, 
    newpostcloseopener, 
    ApoDescriptionShorter,
    filteredPosts
  } = usePoster();





  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.Posts}>
        <div className={styles.title}>
          <h1>Posts Grid</h1>
          <button className={styles.button} onClick={newpostcloseopener}>Add New Post</button>
        </div>

        <Filterbar />

        {/* show add new post component */}
        {addNewPost && <AddNewPost />}
        {addNewPost && <button className={styles.button}>Back to Posts</button>}

        {error && (
          <div>
            <h1
              style={{
                color: "red",
              }}
            >
              Delete was failed
            </h1>
          </div>
        )}

        <div className={styles.cardContainer}>
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              description={ApoDescriptionShorter(post.body)}
              postId={post.id}
            />
          ))}
        </div>

        {/* --------- Pagination Container --------- */}
        {error && <p className={styles.error}>{error}</p>}
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
    </div>
  );
};

export default Posts;
