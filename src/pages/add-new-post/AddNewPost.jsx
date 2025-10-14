import React, { useState } from "react";
import styles from "./AddNewPost.module.scss";
import { usePoster } from "../../context/postercontext.jsx";

const AddNewPost = () => {
  const { addPost } = usePoster();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddPostClicker = async (e) => {
    e.preventDefault(); // Prevent Standard-Formular-Submit
    
    if (!title.trim() || !body.trim()) {
      alert("Please fill out all fields!");
      return;
    }

    if (window.confirm("Do you want to add this post?")) {
      try {
        setLoading(true);
        await addPost(title, body, userId);
        // Reset the form
        setTitle("");
        setBody("");
        setUserId(1);
        alert("Post successfully added!");
      } catch (err) {
        alert("Error adding post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div className={styles.addNewPost}>
      <div className={styles.simpleWrapper}>
        <p>Add New Post</p>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleAddPostClicker}>
          <input
            type="text"
            value={title}
            placeholder="Enter Title..."
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <input
            type="text"
            value={body}
            placeholder="Enter Content..."
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
          />
          <input
            type="number"
            value={userId}
            placeholder="Enter User ID..."
            onChange={(e) => setUserId(e.target.value)}
            disabled={loading}
            max={5}
            min={1}
          />
          <button
            className={styles.createbutton}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddNewPost;
