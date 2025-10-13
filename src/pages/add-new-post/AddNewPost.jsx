import React, { useState, useRef } from "react";
import styles from "./AddNewPost.module.scss";
import { useNavigate } from "react-router-dom";

const AddNewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const handleAddPostClicker = (e) => {
    e.stopPropagation(); // Verhindere Card-Click Event
    console.log("Add Post wurd angeklickt!");
    if (window.confirm("Möchtest du diesen Post wirklich hinzufügen?")) {
      // logic here
      console.log(titleRef.current.value);
      console.log(bodyRef.current.value);
      console.log(title);
      console.log(body);
    }
  };


  // für später updating a resource
  // fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //   method: 'PUT',
  //   body: JSON.stringify({
  //     id: 1,
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1,
  //   }),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));


  return (
    <div className={styles.addNewPost}>
      <div className={styles.simpleWrapper}>
        <p>Add New Post</p>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input
            type="text"
            value={title}
            placeholder="Your Title"
            ref={titleRef}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={body}
            placeholder="Your Description"
            ref={bodyRef}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            className={styles.createbutton}
            type="submit"
            onSubmit={() => handleAddPostClicker()}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddNewPost;
