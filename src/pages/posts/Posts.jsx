import React, { useReducer } from "react";
import styles from "./Posts.module.scss";
// Components
import Card from "../../components/card/Card.jsx";
import AddNewPost from "../add-new-post/AddNewPost.jsx";
import Filterbar from "../../components/filterbar/filterbar.jsx";
// Context
import { usePoster } from "../../context/Context.jsx";
// Reducer
import posterReducer from "../../context/ReducerProvider";


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
    filteredPosts,
    loadMoreButton,
    currentlyLoadedPosts,
  } = usePoster();



  // const [state, dispatch] = useReducer(posterReducer, initialState);


  const onlyShowloadMoreButton = currentlyLoadedPosts > 5 && filteredPosts.length > 1;

  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.Posts}>
        <div className={styles.title}>
          <h1>Posts Grid</h1>
          <button className={styles.button} onClick={newpostcloseopener}>Add New Post</button>
        </div>

        <Filterbar />

        <div className={styles.currentlyLoadedPostsContainer}>
          <p>Currently Loaded Posts: {currentlyLoadedPosts}</p>
        </div>

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
          {filteredPosts.length > 0 && filteredPosts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              description={ApoDescriptionShorter(post.body)}
              postId={post.id}
            />
          ))}
          {filteredPosts.length === 0 && <h1 className={styles.noPostsFound}>No posts found</h1>}
        </div>

        <div className={styles.loadMoreContainer}>
          {onlyShowloadMoreButton && (
            <button className={styles.loadMoreButton} onClick={loadMoreButton}>
            Load More
          </button>
          )}
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
