import React, { useState, useEffect } from "react";
import styles from "./EditPost.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPostById, updatePost } from "../../api/api";
import { usePoster } from "../../context/postercontext.jsx";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { updatePostInContext } = usePoster();
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        setTitle(postData.title);
        setBody(postData.body);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // So it prevents fetchPost() from running when postId is undefined, null, or an empty string.
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // delete the spaces on both sides of the title and body
    if (!title.trim() || !body.trim()) {
      alert("Please fill out all fields!");
      return;
    }

    if (window.confirm("Do you want to save the changes?")) {
      try {
        setSaving(true);
        
        // API call to update
        const response = await updatePost(postId, title, body);
        
        if (!response.ok) {
          throw new Error("Failed to update post");
        }
        
        const updatedPost = await response.json();
        console.log("Post updated:", updatedPost);
        
        // Update the post in the context
        updatePostInContext(postId, title, body);
        
        alert("Post successfully updated!");
        navigate(`/posts/${postId}`);
      } catch (err) {
        alert("Error updating post");
        console.error(err);
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.simpleWrapper}>
        <div className={styles.editPost}>
          <div className={styles.loadingContainer}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.simpleWrapper}>
        <div className={styles.editPost}>
          <div className={styles.errorContainer}>
            <h1>Error</h1>
            <p>{error}</p>
            <button className={styles.backButton} onClick={() => navigate("/posts")}>
              <ArrowLeft size={20} />
              Back to Posts
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.simpleWrapper}>
      <div className={styles.editPost}>
        <button className={styles.backButtonTop} onClick={() => navigate(`/posts/${postId}`)}>
          <ArrowLeft size={20} />
          Back to Post
        </button>

        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1>Edit Post</h1>
            <p>Edit your post</p>
          </div>
          
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  placeholder="Enter Title..."
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={saving}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="body">Content</label>
                <textarea
                  id="body"
                  value={body}
                  placeholder="Enter Content..."
                  onChange={(e) => setBody(e.target.value)}
                  disabled={saving}
                  rows={8}
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  className={styles.saveButton}
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className={styles.cancelButton}
                  type="button"
                  onClick={() => navigate(`/posts/${postId}`)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

