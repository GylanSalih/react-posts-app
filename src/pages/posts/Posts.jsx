import React, { useState, useEffect } from "react";
import styles from "./Posts.module.scss";
import Card from "../../components/card/Card.jsx";
import AddNewPost from "../add-new-post/AddNewPost.jsx";


import { deletePostById, getPosts } from "../../api/api.js";


import { useNavigate } from "react-router-dom";


import { usePoster } from "../../context/postercontext.jsx";


import Filterbar from "../../components/filterbar/filterbar.jsx";

const Posts = () => {
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [addNewPost, setAddNewPost] = useState(false);


  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();
  
  

  const { deletePost, posts, goFirstPage, goNextPage, goLastPage, goPreviousPage, newpostcloseopener, sortByUserId, ApoDescriptionShorter } = usePoster()



  const handleGoFirstPage = () => {
    goFirstPage();
  };

  const handleGoNextPage = () => {
    goNextPage();
  };

  const handleGoLastPage = () => {
    goLastPage();
  };

  const handleGoPreviousPage = () => {
    goPreviousPage();
  };

  const handleApoDescriptionShorter = (description) => {
    return ApoDescriptionShorter(description);
  };

  const handleDelete = (id) => {
    deletePost(id);
  };

 const handleSortByUserId = (userId) => {
  sortByUserId(userId);
 };

const handleNewpostcloseopener = () => {
  newpostcloseopener();
};





  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.Posts}>
        <div className={styles.title}>
          <h1>Posts Grid</h1>
          <button className={styles.button} onClick={handleNewpostcloseopener}>Add New Post</button>
        </div>

        <Filterbar sortByUserId={handleSortByUserId} />


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
          {posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              description={handleApoDescriptionShorter(post.body)}
              deletePost={handleDelete}
              postId={post.id}
            ></Card>
          ))}
        </div>

        {/* --------- Pagination Container --------- */}
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.paginationContainer}>
          <button className={styles.button} onClick={handleGoFirstPage}>
            First Page
          </button>
          <button className={styles.button} onClick={handleGoPreviousPage}>
            Previous Page
          </button>
          <button className={styles.button}>Current Page: {page}</button>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
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
          <button className={styles.button} onClick={handleGoNextPage}>
            Next Page
          </button>
          <button className={styles.button} onClick={handleGoLastPage}>
            Last Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
