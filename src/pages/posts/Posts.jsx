import React, { useState, useEffect } from "react";
import styles from "./Posts.module.scss";
import { deletePostById, getPosts } from "../../api/api";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [limit, setLimit] = useState(10);
  

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => setError(error));
  }, [page, limit]);

  useEffect(() => {
    async function test() {
      const result = await getPosts(page);
      const lastPage = limit;
      setLastPage(lastPage);
      if (!result.ok) {
        throw new Error("Failed to fetch posts");
      }
      const list = await result.json();
      console.log(list);
      setPosts(list);
    }

    test();
  }, [page, limit]);

  // ApoDescriptionShorter is a function that shortens the description of the post to 100 characters
  const ApoDescriptionShorter = (description) => {
    return description.slice(0, 100) + "...";
  };

  const goNextPage = () => {
    if (page >= lastPage) return;
    setPage(page + 1);
  };

  const goLastPage = () => {
    if (page >= lastPage) return;
    setPage(lastPage);
  };

  const goFirstPage = () => {
    if (page <= 1) return;
    setPage(1);
  };

  const goPreviousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const deletePost = async (id) => {
    setError(false);
    const result = await deletePostById(id);

    console.log(result);
    if (!result.ok) {
      setError(true);
      return;
    }

    const filtered = posts.filter((post) => post.id !== id);
    setPosts(filtered);
    console.log(filtered);
  };

  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.Posts}>
        <div className={styles.title}>
          <h1>Posts Grid</h1>
          <button className={styles.button} onClick={() => navigate("/AddNewPost")}>Add New Post</button>
        </div>

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
              description={ApoDescriptionShorter(post.body)}
              deletePost={deletePost}
              postId={post.id}
            ></Card>
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
