import React from 'react';
import styles from './BlogCard.module.css';
const BlogCard = ({ title, description, deletePost, postId }) => {
  return (
    <div className={styles.blogCard}>
      <img src="/images/blogImg.png" alt="blog-card" className={styles.blogCardImage} />
      <h1 className={styles.blogCardTitle}>{title}</h1>
      <p className={styles.blogCardDescription}>{description}</p>
      <button className={styles.blogCardButton} onClick={() => deletePost(postId)}>Delete</button>
      <button className={styles.blogCardButton}>Read More</button>
    </div>
  );
};

export default BlogCard;