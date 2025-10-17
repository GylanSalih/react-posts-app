import React, { useReducer } from "react";
import styles from "./Home.module.scss";
// Components
import Card from "../../components/card/Card.jsx";
import AddNewPost from "../add-new-post/AddNewPost.jsx";
import Filterbar from "../../components/filterbar/filterbar.jsx";

import Pagination from "./pagination/Pagination.jsx"

// Context
import { usePoster } from "../../context/Context.jsx";


const Home = () => {
  const { 
    posts,
    error, 
    openUi,
    newpostcloseopener, 
    ApoDescriptionShorter,
    filteredPosts,
    loadMoreButton,
  } = usePoster();


  const onlyShowloadMoreButton = posts.length > 5 && filteredPosts.length > 5;



  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.Posts}>
        <div className={styles.title}>
          <h1>Posts Grid</h1>
          <button className={styles.button} onClick={newpostcloseopener}>Add New Post</button>
        </div>

        <Filterbar />

        <div className={styles.currentlyLoadedPostsContainer}>
          <p>Currently Loaded Posts: {posts.length}</p>
        </div>

        {/* show add new post component */}
        {openUi && <AddNewPost />}
        {openUi && <button className={styles.button}>Back to Posts</button>}


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

          <Pagination />


        
      </div>
    </div>
  );
};

export default Home;
