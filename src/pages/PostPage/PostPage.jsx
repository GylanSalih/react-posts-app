import React, { useState, useEffect } from "react";
import styles from "./PostPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostById, getPostById } from "../../api/api";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(postId);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const postData = await response.json();
        setPost(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleDelete = async () => {
    if (window.confirm("Do you really want to delete this post?")) {
      try {
        const response = await deletePostById(postId);
        if (response.ok) {
          navigate("/");
        } else {
          setError("Error deleting post");
        }
      } catch (err) {
        setError("Error deleting post");
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.postPage}>
        <div className={styles.postPageContainer}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.postPage}>
        <div className={styles.postPageContainer}>
          <h1>Error</h1>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.postPage}>
        <div className={styles.postPageContainer}>
          <h1>Post not found</h1>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.postPage}>
        <div className={styles.postPageContainer}>
          <h1>{post.title}</h1>
          <div className={styles.postMeta}>
            <p className={styles.postId}>Post ID: {post.id}</p>
            <p className={styles.userId}>User ID: {post.userId}</p>
          </div>
          <div className={styles.postContent}>
            <p>{post.body}</p>
          </div>
          <div className={styles.buttonGroup}>
            <button
              className={styles.editButton}
              onClick={() => navigate(`/editpost/${post.id}`)}
            >
              Edit
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
                Delete
            </button>
            <button className={styles.backButton} onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
