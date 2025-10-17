


import React, { useState, useEffect } from "react";
import styles from "./SinglePostPageView.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPostById } from "../../api/api";
import { usePoster } from "../../context/Context.jsx";

const SinglePostPageView = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { deletePost, posts } = usePoster();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Zuerst im Context nach dem Post suchen
        const postFromContext = posts.find(p => p.id === parseInt(postId));
        
        if (postFromContext) {
          // Wenn im Context vorhanden, diese Daten verwenden
          setPost(postFromContext);
          setLoading(false);
        } else {
          // Ansonsten von der API laden
          const response = await getPostById(postId);
          if (!response.ok) {
            throw new Error("Post not found");
          }
          const postData = await response.json();
          setPost(postData);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, posts]);

  // Datum formatieren
  const dateShower = () => {
    return new Date().toLocaleDateString("de-DE", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  // const handleDelete = async () => {
  //   if (window.confirm("Do you want to delete this post?")) {
  //     try {
  //       await deletePost(postId);
  //       // Navigate to the Posts-Page after successful deletion
  //       navigate("/");
  //     } catch (err) {
  //       setError("Error deleting post");
  //     }
  //   }
  // };

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this post?")) {
      try {
        await deletePost(parseInt(postId));
        // Navigate to the Posts-Page after successful deletion
        navigate("/");
      } catch (err) {
        setError("Error deleting post");
      }
    }
  };



// geht cleaner aber stürtzt ab wenn loading weg ist
  if (loading) {
    return (
      <p>Loading...</p>
    );
  }
  if (error) {
    return (
      <>
      <h1>Error</h1>
      <p>{error}</p>
      </>
    );
  }
  if (!post) {
    return (
      <>
      <h1>Post not found</h1>
      </>
    );
  }




  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.postPage}>
        <button className={styles.backButtonTop} onClick={() => navigate("/")}>
          <ArrowLeft size={20} />
          Back to Posts
        </button>


        <div className={styles.postCard}>
          <div className={styles.imageContainer}>
            <img 
              src="/images/blogImg.png" 
              alt={post.title} 
              className={styles.postImage} 
            />
          </div>
          
          <div className={styles.postPageContainer}>
            <div className={styles.postHeader}>
              <h1>{post.title}</h1>
              <div className={styles.postMeta}>
                <span className={styles.date}>{dateShower()}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.userId}>User {post.userId}</span>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPageView;